import { DocArticle } from '../types';

export const documentationData: DocArticle[] = [
  {
    id: 'doc-01',
    slug: 'esp32-freertos-robotics',
    category: 'Microcontrollers',
    categorySlug: 'microcontrollers',
    title: 'ESP32 Dual-Core FreeRTOS Multi-Tasking for Robotics',
    summary: 'How to split motor PID loops, sensor telemetry, and wireless communications across dual 240MHz Xtensa cores without jitter.',
    difficulty: 'Intermediate',
    readTime: '8 min read',
    lastUpdated: '2026-02-10',
    author: 'RTIST Embedded Systems Division',
    tags: ['ESP32', 'FreeRTOS', 'Concurrency', 'PID', 'Real-Time'],
    introduction: 'In competitive robotics (such as Robo Sumo or RC telemetry), performing wireless packet reception, IMU polling, and PID motor loop calculations in a single blocking Arduino loop leads to packet drops and unstable motor oscillations. The ESP32 provides dual 240MHz Xtensa LX6/LX7 cores running FreeRTOS natively. This guide explains how to pin critical 1kHz control loops to Core 1 while delegating WiFi/ESP-NOW and telemetry logging to Core 0.',
    howItWorks: 'FreeRTOS utilizes a preemptive priority-based scheduler. We create two independent tasks: `TaskMotorPID` with high priority (Priority 5) pinned to Core 1, and `TaskTelemetry` with lower priority (Priority 1) pinned to Core 0. Thread-safe communication between cores is maintained using FreeRTOS Queues and Mutexes.',
    specifications: [
      { label: 'CPU Architecture', value: 'Xtensa Dual-Core 32-bit LX6 @ 240MHz' },
      { label: 'SRAM', value: '520 KB internal SRAM' },
      { label: 'Timer Resolution', value: '64-bit hardware timers (80MHz prescaler)' },
      { label: 'FreeRTOS Tick Rate', value: '1000 Hz (1ms standard quantum)' }
    ],
    pinout: [
      { pin: 'GPIO 18', name: 'PWM_M1_A', type: 'PWM', description: 'Motor 1 Forward High-Frequency PWM' },
      { pin: 'GPIO 19', name: 'PWM_M1_B', type: 'PWM', description: 'Motor 1 Reverse High-Frequency PWM' },
      { pin: 'GPIO 21', name: 'SDA_IMU', type: 'I2C', description: 'I2C Data line for MPU6050 / BNO085' },
      { pin: 'GPIO 22', name: 'SCL_IMU', type: 'I2C', description: 'I2C Clock line for IMU' },
      { pin: '3V3', name: 'VDD', type: 'Power', description: 'Regulated 3.3V Logic Supply (Max 500mA)' },
      { pin: 'GND', name: 'GND', type: 'GND', description: 'Common Ground Plane' }
    ],
    wiringNotes: 'Always connect a 0.1uF ceramic decoupling capacitor across VCC and GND close to the IMU sensor. Never power 12V high-torque motors directly from the ESP32 3.3V pin; common ground must be tied together across motor driver and MCU.',
    codeSnippet: {
      language: 'cpp',
      description: 'C++ ESP-IDF / Arduino dual-core task initialization with thread-safe queues',
      code: `#include <Arduino.h>

TaskHandle_t TaskMotorControlHandle;
TaskHandle_t TaskTelemetryHandle;

// Structure for telemetry packet
struct TelemetryData {
    int16_t rpm_left;
    int16_t rpm_right;
    float battery_voltage;
};

QueueHandle_t telemetryQueue;

// Core 1 Task: High-frequency deterministic motor PID (1000 Hz)
void TaskMotorControl(void *pvParameters) {
    TickType_t xLastWakeTime = xTaskGetTickCount();
    const TickType_t xFrequency = pdMS_TO_TICKS(1); // 1ms = 1000Hz

    for (;;) {
        // 1. Read optical encoders & calculate PID
        // computePID();

        // 2. Push data to queue without blocking
        TelemetryData packet = { .rpm_left = 420, .rpm_right = 418, .battery_voltage = 11.85f };
        xQueueSend(telemetryQueue, &packet, 0);

        // Deterministic delay until next tick
        vTaskDelayUntil(&xLastWakeTime, xFrequency);
    }
}

// Core 0 Task: Wireless communications & slow telemetry
void TaskTelemetry(void *pvParameters) {
    TelemetryData packet;
    for (;;) {
        if (xQueueReceive(telemetryQueue, &packet, pdMS_TO_TICKS(10)) == pdTRUE) {
            // Send over ESP-NOW / LoRa
            // Serial.printf("RPM L:%d R:%d | Bat: %.2fV\\n", packet.rpm_left, packet.rpm_right, packet.battery_voltage);
        }
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}

void setup() {
    Serial.begin(115200);
    telemetryQueue = xQueueCreate(10, sizeof(TelemetryData));

    // Pin motor control task to Core 1
    xTaskCreatePinnedToCore(
        TaskMotorControl,
        "MotorControlPID",
        4096,
        NULL,
        5, // High Priority
        &TaskMotorControlHandle,
        1  // Core 1
    );

    // Pin telemetry / radio task to Core 0
    xTaskCreatePinnedToCore(
        TaskTelemetry,
        "TelemetryRadio",
        4096,
        NULL,
        1, // Low Priority
        &TaskTelemetryHandle,
        0  // Core 0
    );
}

void loop() {
    // Empty: FreeRTOS tasks manage all execution
    vTaskDelete(NULL);
}`
    },
    applications: [
      'High-speed line followers needing 2kHz analog sampling and OLED display updates.',
      'Autonomous combat robots running simultaneous sensor fusion and ESC throttling.',
      'RC Car telemetry nodes streaming gyro and RPM data over 2.4GHz.'
    ],
    troubleshooting: [
      {
        issue: 'Task Watchdog Timer (WDT) triggering a panic reset on Core 0.',
        solution: 'Core 0 runs background WiFi tasks. Add a small `vTaskDelay(1)` or yield inside any infinite loops on Core 0 to allow the IDLE task to reset the watchdog.'
      },
      {
        issue: 'Corrupted variables when accessed by both tasks.',
        solution: 'Never write to shared global variables directly. Use FreeRTOS `QueueHandle_t` or protect access with `xSemaphoreCreateMutex()`.'
      }
    ],
    relatedArticles: [
      { title: 'PID Motor Velocity Control from Theory to C Code', category: 'Robotics', slug: 'pid-motor-velocity-control' },
      { title: 'H-Bridge MOSFET Drivers and High-Amp ESCs', category: 'Motor Drivers', slug: 'h-bridge-mosfet-motor-drivers' }
    ]
  },
  {
    id: 'doc-02',
    slug: 'pid-motor-velocity-control',
    category: 'Robotics',
    categorySlug: 'robotics',
    title: 'Closed-Loop PID Motor Control: From Differential Equations to Discrete C++',
    summary: 'Mathematical formulation, anti-windup clamping, derivative filtering, and step response tuning on the bench.',
    difficulty: 'Intermediate',
    readTime: '10 min read',
    lastUpdated: '2026-01-22',
    author: 'RTIST Control Systems Team',
    tags: ['PID', 'Control Theory', 'Encoders', 'DC Motors', 'Embedded C'],
    introduction: 'Open-loop motor control (simply setting PWM duty cycle) fails when battery voltage drops or mechanical resistance changes. A Proportional-Integral-Derivative (PID) controller monitors real wheel velocity via quadrature encoders and dynamically adjusts PWM output to track desired setpoints with zero steady-state error.',
    howItWorks: 'The controller calculates the error `e(t) = Setpoint - ProcessValue`. The output is the sum of three terms: Proportional (reacts to present error), Integral (accumulates past errors to eliminate offset), and Derivative (estimates future rate of change to dampen overshoot).',
    specifications: [
      { label: 'Sampling Interval (dt)', value: '1.0ms - 5.0ms (Deterministic)' },
      { label: 'Integral Clamping', value: 'Anti-windup limit [-MaxPWM, +MaxPWM]' },
      { label: 'Derivative Filter', value: 'First-order Low Pass (alpha = 0.1 to 0.3)' }
    ],
    pinout: [
      { pin: 'CH_A', name: 'Encoder Channel A', type: 'Digital I/O', description: 'Hardware Interrupt 1 (Rising/Falling)' },
      { pin: 'CH_B', name: 'Encoder Channel B', type: 'Digital I/O', description: 'Direction Determination Pin' },
      { pin: 'PWM_PIN', name: 'Motor PWM Out', type: 'PWM', description: 'Timer-driven PWM to MOSFET Driver' }
    ],
    wiringNotes: 'Encoder signal lines are susceptible to motor brush noise. Keep encoder cables physically separate from high-current motor power leads and use shielded twisted pairs.',
    codeSnippet: {
      language: 'cpp',
      description: 'Production-ready discrete PID controller implementation in C++ with anti-windup',
      code: `class PIDController {
private:
    float kp, ki, kd;
    float prev_error;
    float integral;
    float out_min, out_max;
    float d_filter_alpha;
    float prev_filtered_derivative;

public:
    PIDController(float p, float i, float d, float min_val, float max_val)
        : kp(p), ki(i), kd(d), prev_error(0.0f), integral(0.0f),
          out_min(min_val), out_max(max_val), d_filter_alpha(0.2f),
          prev_filtered_derivative(0.0f) {}

    float compute(float target, float current, float dt) {
        float error = target - current;

        // Proportional term
        float p_out = kp * error;

        // Integral term with anti-windup clamping
        integral += error * dt;
        float i_out = ki * integral;

        // Derivative term with low-pass filtering to suppress high-frequency noise
        float raw_derivative = (error - prev_error) / dt;
        float filtered_derivative = (d_filter_alpha * raw_derivative) + 
                                   ((1.0f - d_filter_alpha) * prev_filtered_derivative);
        prev_filtered_derivative = filtered_derivative;
        float d_out = kd * filtered_derivative;

        // Compute total output
        float total_output = p_out + i_out + d_out;

        // Output clamping & conditional integral anti-windup
        if (total_output > out_max) {
            total_output = out_max;
            // Prevent integral accumulation when saturated in same direction
            if (error > 0) integral -= error * dt;
        } else if (total_output < out_min) {
            total_output = out_min;
            if (error < 0) integral -= error * dt;
        }

        prev_error = error;
        return total_output;
    }

    void reset() {
        prev_error = 0.0f;
        integral = 0.0f;
        prev_filtered_derivative = 0.0f;
    }
};`
    },
    applications: [
      'Differential drive mobile robot trajectory following.',
      'Precision velocity sync on dual-motor line tracers.',
      'High-speed RC car gyro yaw rate stabilization.'
    ],
    troubleshooting: [
      {
        issue: 'Severe motor buzzing and overheating even when stationary.',
        solution: 'Derivative gain (Kd) is too high and amplifying encoder quantization noise. Reduce Kd and increase low-pass filter smoothing.'
      },
      {
        issue: 'Overshoot and oscillation around target setpoint.',
        solution: 'Proportional gain (Kp) is too high or Integral gain (Ki) is causing integral windup. Decrease Ki and add anti-windup clamping.'
      }
    ],
    relatedArticles: [
      { title: 'ESP32 Dual-Core FreeRTOS Multi-Tasking for Robotics', category: 'Microcontrollers', slug: 'esp32-freertos-robotics' }
    ]
  },
  {
    id: 'doc-03',
    slug: 'h-bridge-mosfet-motor-drivers',
    category: 'Motor Drivers',
    categorySlug: 'motor-drivers',
    title: 'H-Bridge MOSFET Gate Drivers & High-Current ESC Topologies',
    summary: 'Design principles for N-channel H-bridges, bootstrap charge pumps, flyback protection, and shoot-through dead-time generation.',
    difficulty: 'Advanced',
    readTime: '12 min read',
    lastUpdated: '2026-01-30',
    author: 'RTIST Power Electronics Division',
    tags: ['MOSFET', 'H-Bridge', 'Motor Driver', 'Hardware Design', 'PCB'],
    introduction: 'Driving high-power 24V 30A DC motors or 3-phase sensorless brushless motors requires understanding MOSFET switching characteristics. Operating N-channel MOSFETs in high-side configurations requires bootstrap charge pumps to generate gate voltages 10V above the main battery rail (Vgs > 10V) for lowest RDS(on).',
    howItWorks: 'An H-bridge uses 4 switches to reverse current direction through an inductive motor winding. Gate driver ICs (e.g., IR2104 / DRV8701) manage dead-time insertion (preventing top and bottom MOSFETs from turning on simultaneously, which creates a catastrophic short circuit across the battery).',
    specifications: [
      { label: 'Target Voltage Range', value: '12V - 30V DC (3S - 7S LiPo)' },
      { label: 'Continuous Current', value: '30A RMS (80A Peak 2-second burst)' },
      { label: 'Dead Time', value: '250ns - 500ns hardware generated' },
      { label: 'PWM Switching Frequency', value: '20 kHz (above human audible range)' }
    ],
    wiringNotes: 'Motor loops produce high dI/dt noise. Place high-capacity low-ESR electrolytic capacitors (e.g. 2x 1000uF 35V) directly across the MOSFET power bridge terminals to absorb back-EMF energy spikes.',
    codeSnippet: {
      language: 'c',
      description: 'STM32 Hardware Timer Complementary PWM with Dead-Time Generation (TIM1)',
      code: `// STM32 HAL Hardware Timer 1 Complementary PWM Configuration
TIM_HandleTypeDef htim1;

void MX_TIM1_Init(void) {
    TIM_OC_InitTypeDef sConfigOC = {0};
    TIM_BreakDeadTimeConfigTypeDef sBreakDeadTimeConfig = {0};

    htim1.Instance = TIM1;
    htim1.Init.Prescaler = 0;
    htim1.Init.CounterMode = TIM_COUNTERMODE_CENTERALIGNED1;
    htim1.Init.Period = 2100; // 168MHz / 2100 / 2 = 20kHz Center-Aligned PWM
    htim1.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
    htim1.Init.RepetitionCounter = 0;
    HAL_TIM_PWM_Init(&htim1);

    sConfigOC.OCMode = TIM_OCMODE_PWM1;
    sConfigOC.Pulse = 1050; // 50% initial duty cycle
    sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
    sConfigOC.OCNPolarity = TIM_OCNPOLARITY_HIGH;
    sConfigOC.OCIdleState = TIM_OCIDLESTATE_RESET;
    sConfigOC.OCNIdleState = TIM_OCNIDLESTATE_RESET;
    HAL_TIM_PWM_ConfigChannel(&htim1, &sConfigOC, TIM_CHANNEL_1);

    // Hardware Dead-Time Insertion (400ns safety window)
    sBreakDeadTimeConfig.OffStateRunMode = TIM_OSSR_ENABLE;
    sBreakDeadTimeConfig.OffStateIDLEMode = TIM_OSSI_ENABLE;
    sBreakDeadTimeConfig.LockLevel = TIM_LOCKLEVEL_OFF;
    sBreakDeadTimeConfig.DeadTime = 68; // 68 * (1/168MHz) ≈ 404 nanoseconds
    sBreakDeadTimeConfig.BreakState = TIM_BREAK_ENABLE;
    sBreakDeadTimeConfig.BreakPolarity = TIM_BREAKPOLARITY_HIGH;
    sBreakDeadTimeConfig.AutomaticOutput = TIM_AUTOMATICOUTPUT_ENABLE;
    HAL_TIMEx_ConfigBreakDeadTime(&htim1, &sBreakDeadTimeConfig);

    // Start Complementary PWM Outputs (TIM1_CH1 and TIM1_CH1N)
    HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);
    HAL_TIMEx_PWMN_Start(&htim1, TIM_CHANNEL_1);
}`
    },
    applications: [
      '3kg SumoBot high-torque reversible drivetrain.',
      'Robo Soccer omni-wheel dynamic vector motor driving.',
      'Custom Electronic Speed Controllers (ESCs) for RC models.'
    ],
    troubleshooting: [
      {
        issue: 'MOSFET blows immediately upon applying PWM signal.',
        solution: 'Check dead-time configuration. Shoot-through occurs if High-Side and Low-Side gates conduct simultaneously. Ensure minimum 300ns dead time.'
      },
      {
        issue: 'High-side MOSFET runs extremely hot while low-side remains cool.',
        solution: 'Bootstrap capacitor is undersized or duty cycle is at 100% DC. High-side gate driver needs PWM switching to refresh bootstrap capacitor charge.'
      }
    ],
    relatedArticles: [
      { title: 'LiPo Battery Safety & Power Distribution Networks', category: 'Electronics', slug: 'lipo-battery-safety-power-distribution' }
    ]
  },
  {
    id: 'doc-04',
    slug: 'lipo-battery-safety-power-distribution',
    category: 'Electronics',
    categorySlug: 'electronics',
    title: 'LiPo Battery Safety, C-Ratings & Robust Power Distribution',
    summary: 'Discharge calculations, internal resistance testing, safe charging protocols, and noise isolation between logic and power buses.',
    difficulty: 'Beginner',
    readTime: '6 min read',
    lastUpdated: '2026-02-01',
    author: 'RTIST Safety & Pit Operations',
    tags: ['LiPo', 'Battery Safety', 'Power Rails', 'Buck Regulators', 'Fuses'],
    introduction: 'Lithium Polymer (LiPo) batteries power our RC cars and combat robots due to their exceptional power-to-weight ratio and burst discharge capabilities (up to 100C). However, mishandling LiPos poses severe fire risks.',
    howItWorks: 'A 3S LiPo pack consists of three cells in series with a nominal voltage of 11.1V (3.7V/cell) and a full charge voltage of 12.6V (4.20V/cell). Never discharge below 3.3V per cell (9.9V total for 3S) to avoid irreversible chemical breakdown and internal plating.',
    specifications: [
      { label: 'Max Voltage Per Cell', value: '4.20V (4.35V for LiHV)' },
      { label: 'Nominal Voltage', value: '3.70V per cell' },
      { label: 'Cutoff / Danger Threshold', value: '3.20V per cell' },
      { label: 'Storage Voltage', value: '3.80V - 3.85V per cell' }
    ],
    wiringNotes: 'Always place a main safety fuse and emergency disconnect loop (XT90 / XT60) in series with the positive battery lead immediately before any power distribution boards.',
    codeSnippet: {
      language: 'cpp',
      description: 'Analog battery voltage monitoring with low-voltage buzzer alarm alert',
      code: `const int BATTERY_ADC_PIN = 34; // ESP32 ADC1_CH6
const float VOLTAGE_DIVIDER_RATIO = 4.0f; // e.g., 30k / 10k divider
const float V_REF = 3.3f;
const int ADC_RESOLUTION = 4095;

float readBatteryVoltage() {
    int raw = analogRead(BATTERY_ADC_PIN);
    float pinVoltage = (raw / (float)ADC_RESOLUTION) * V_REF;
    return pinVoltage * VOLTAGE_DIVIDER_RATIO;
}

void checkBatterySafety(float currentVoltage, int cellCount) {
    float perCellVoltage = currentVoltage / cellCount;
    if (perCellVoltage < 3.40f) {
        // TRIGGER AUDIBLE BUZZER & KILL MOTOR PWM IMMEDIATELY
        digitalWrite(BUZZER_PIN, HIGH);
        emergencyStopMotors();
        Serial.printf("CRITICAL LOW VOLTAGE WARNING: %.2fV (%.2fV/cell)\\n", currentVoltage, perCellVoltage);
    }
}`
    },
    applications: [
      'RC Car pit battery maintenance.',
      'Combat robot emergency cut-off switches.',
      'Onboard MCU battery telemetry.'
    ],
    troubleshooting: [
      {
        issue: 'Puffed / swollen battery pack after high-speed run.',
        solution: 'Battery was overdischarged or discharge C-rating was exceeded. Immediately retire the pack, discharge completely in saline bath, and dispose safely.'
      }
    ],
    relatedArticles: [
      { title: 'ESP32 Dual-Core FreeRTOS Multi-Tasking for Robotics', category: 'Microcontrollers', slug: 'esp32-freertos-robotics' }
    ]
  },
  {
    id: 'doc-05',
    slug: 'ros2-nav2-autonomous-slam',
    category: 'Advanced',
    categorySlug: 'advanced',
    title: 'ROS 2 Humble & Nav2: 2D SLAM and Dynamic Obstacle Avoidance',
    summary: 'Setting up Cartographer SLAM, costmap inflation layers, TF2 coordinate tree, and waypoint navigation on Ubuntu 22.04.',
    difficulty: 'Advanced',
    readTime: '15 min read',
    lastUpdated: '2026-02-12',
    author: 'RTIST Autonomous Systems Group',
    tags: ['ROS 2', 'Nav2', 'SLAM', 'LiDAR', 'Robotics Architecture'],
    introduction: 'Nav2 (Navigation 2) is the industry standard navigation framework for ROS 2. This guide details how to integrate RPLiDAR laser scans, wheel odometry transforms, and costmap recovery behaviors on differential-drive rovers.',
    howItWorks: 'Cartographer builds an occupancy grid map (`/map`) using scan matching. The Nav2 stack runs global planners (NavFn / Dijkstra) to compute shortest collision-free paths, while local planners (DWB controller) calculate instantaneous `/cmd_vel` velocity twists.',
    specifications: [
      { label: 'ROS Distribution', value: 'ROS 2 Humble Hawksbill LTS' },
      { label: 'TF2 Base Frame', value: 'base_link -> laser_frame / odom -> base_link' },
      { label: 'Costmap Resolution', value: '0.05m (5cm per voxel)' }
    ],
    wiringNotes: 'Connect RPLiDAR USB-UART adapter to Jetson via dedicated USB 3.0 port and configure fixed udev rules (`/dev/rplidar`) to avoid port remapping across reboots.',
    codeSnippet: {
      language: 'python',
      description: 'Python ROS 2 Node subscribing to laser scans and executing emergency stop obstacle avoidance',
      code: `import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist

class ObstacleAvoidanceNode(Node):
    def __init__(self):
        super().__init__('obstacle_avoidance_node')
        self.subscription = self.create_subscription(
            LaserScan,
            '/scan',
            self.scan_callback,
            10
        )
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.safe_distance = 0.40 # 40cm emergency stop threshold
        self.get_logger().info("Autonomous Obstacle Avoidance Node Initialized")

    def scan_callback(self, msg: LaserScan):
        # Examine forward 60-degree sector (-30 deg to +30 deg)
        num_ranges = len(msg.ranges)
        mid_idx = num_ranges // 2
        sector_span = int((30.0 / 360.0) * num_ranges)
        
        front_readings = msg.ranges[mid_idx - sector_span : mid_idx + sector_span]
        valid_ranges = [r for r in front_readings if msg.range_min < r < msg.range_max]

        twist = Twist()
        if valid_ranges and min(valid_ranges) < self.safe_distance:
            self.get_logger().warn(f"Obstacle detected within {min(valid_ranges):.2f}m! Halting rover.")
            twist.linear.x = 0.0
            twist.angular.z = 0.5 # Pivot turn away from obstacle
        else:
            twist.linear.x = 0.3  # Cruise forward at 0.3 m/s
            twist.angular.z = 0.0

        self.cmd_pub.publish(twist)

def main(args=None):
    rclpy.init(args=args)
    node = ObstacleAvoidanceNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()`
    },
    applications: [
      'Indoor automated guided vehicles (AGVs) and warehouse rovers.',
      'Autonomous maze navigators and search-and-rescue rovers.'
    ],
    troubleshooting: [
      {
        issue: 'TF transform missing warning: "Can\'t transform odom to base_link".',
        solution: 'Ensure your motor controller node or robot_localization EKF node is actively publishing the `odom` to `base_link` transform broadcast.'
      }
    ],
    relatedArticles: [
      { title: 'ESP32 Dual-Core FreeRTOS Multi-Tasking for Robotics', category: 'Microcontrollers', slug: 'esp32-freertos-robotics' }
    ]
  }
];
