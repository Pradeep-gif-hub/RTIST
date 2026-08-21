import { appendFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const csvDirectory = path.resolve(process.cwd(), 'data');
const csvPath = path.join(csvDirectory, 'recruitment-applications.csv');
const csvHeaders = [
  'createdAt',
  'name',
  'email',
  'rollNumber',
  'branch',
  'year',
  'areasOfInterest',
  'technicalSkills',
  'priorExperience',
  'whyJoin',
  'githubOrPortfolio',
  'status',
];

function escapeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export interface RecruitmentCsvRow {
  createdAt: string;
  name: string;
  email: string;
  rollNumber: string;
  branch: string;
  year: string;
  areasOfInterest: string[];
  technicalSkills: string;
  priorExperience?: string;
  whyJoin: string;
  githubOrPortfolio?: string;
  status: string;
}

export async function appendRecruitmentApplication(row: RecruitmentCsvRow): Promise<void> {
  await mkdir(csvDirectory, { recursive: true });

  let fileExists = true;
  try {
    await access(csvPath);
  } catch {
    fileExists = false;
  }

  const values = [
    row.createdAt,
    row.name,
    row.email,
    row.rollNumber,
    row.branch,
    row.year,
    row.areasOfInterest.join('; '),
    row.technicalSkills,
    row.priorExperience || '',
    row.whyJoin,
    row.githubOrPortfolio || '',
    row.status,
  ].map((value) => escapeCsvValue(value));

  const content = `${fileExists ? '' : `${csvHeaders.join(',')}\n`}${values.join(',')}\n`;
  await appendFile(csvPath, content, 'utf8');
}