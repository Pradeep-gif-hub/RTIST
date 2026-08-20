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
      category: 'ROS 2 & Advanced',
      categorySlug: 'ros2-advanced',
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
  },
  {
    id: 'doc-06',
    slug: 'arduino-uno-r3-introduction',
    category: 'Microcontrollers',
    categorySlug: 'microcontrollers',
    title: 'Arduino UNO R3: Your First Robotics Controller',
    summary: 'A beginner-friendly board for learning GPIO, PWM, serial communication, and simple robot control.',
    difficulty: 'Beginner',
    readTime: '7 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Education Team',
    tags: ['Arduino', 'UNO', 'GPIO', 'PWM', 'Beginner'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    introduction: 'The Arduino UNO R3 is the most common starting point for robotics students because it is simple, well-documented, and approachable for learning how hardware and software interact.',
    howItWorks: 'The ATmega328P microcontroller runs a loop that reads sensors, processes logic, and updates outputs such as LEDs, servos, or motor drivers. It communicates with other devices using GPIO, PWM, Analog Input, UART, I2C, and SPI.',
    specifications: [
      { label: 'Microcontroller', value: 'ATmega328P' },
      { label: 'Operating Voltage', value: '5V' },
      { label: 'Clock Speed', value: '16 MHz' },
      { label: 'Digital I/O', value: '14 pins (6 PWM-capable)' },
      { label: 'Analog Inputs', value: '6' },
      { label: 'Flash Memory', value: '32 KB' }
    ],
    pinout: [
      { pin: '5V', name: 'Power Out', type: 'Power', description: '5V supply for shields or peripherals' },
      { pin: 'GND', name: 'Ground', type: 'GND', description: 'Common ground reference' },
      { pin: 'D9', name: 'PWM Output', type: 'PWM', description: 'Heartbeat or motor control pin' },
      { pin: 'A0-A5', name: 'Analog Input', type: 'Analog In', description: 'Reads sensor voltages' },
      { pin: 'TX/RX', name: 'Serial', type: 'UART', description: 'Debugging and communication' }
    ],
    wiringNotes: 'Use a common ground between the Arduino and any external sensors or motor drivers. Avoid powering motors directly from the board; use a separate supply or driver board for high-current loads.',
    codeSnippet: {
      language: 'cpp',
      description: 'Blinking LED and reading an analog sensor on UNO',
      code: `const int ledPin = 13;
const int sensorPin = A0;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  digitalWrite(ledPin, HIGH);
  delay(200);
  digitalWrite(ledPin, LOW);
  delay(200);
  Serial.println(sensorValue);
}`
    },
    applications: [
      'First-year electronics prototypes',
      'Line-follower robots',
      'Sensor nodes and debug systems',
      'Simple robot controller prototypes'
    ],
    troubleshooting: [
      {
        issue: 'Board resets during motor startup.',
        solution: 'Motors draw excess current and brown out the board. Use a separate supply for motors and keep the ground tied together.'
      },
      {
        issue: 'Serial monitor shows garbled text.',
        solution: 'Verify that the baud rate matches exactly and that TX/RX are not cross-connected to the wrong side.'
      }
    ],
    externalDocLinks: [
      { label: 'Arduino UNO R3 Documentation', url: 'https://docs.arduino.cc/hardware/uno-rev3/' },
      { label: 'Arduino Docs Home', url: 'https://docs.arduino.cc/' }
    ]
  },
  {
    id: 'doc-07',
    slug: 'arduino-nano-compact-robotics',
    category: 'Microcontrollers',
    categorySlug: 'microcontrollers',
    title: 'Arduino Nano: Compact Robotics Controller',
    summary: 'A small, breadboard-friendly microcontroller designed for compact robot builds and sensor modules.',
    difficulty: 'Beginner',
    readTime: '5 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Hardware Team',
    tags: ['Arduino', 'Nano', 'Compact', 'Embedded'],
    introduction: 'The Nano is often preferred when a project needs the power of an Arduino but the footprint must remain small. It is especially useful in compact robot prototypes and wearable electronics.',
    howItWorks: 'The Nano uses the same ATmega328P family as the UNO, but packs it into a smaller board with a Mini-USB or USB-C connector depending on the generation. It connects to sensors and motor drivers using the same digital and analog interfaces.',
    specifications: [
      { label: 'Microcontroller', value: 'ATmega328P' },
      { label: 'Operating Voltage', value: '5V' },
      { label: 'Clock Speed', value: '16 MHz' },
      { label: 'ADC Resolution', value: '10-bit' },
      { label: 'Form Factor', value: 'Breadboard-friendly' }
    ],
    wiringNotes: 'The Nano is a great fit for sensor boards and compact robot controllers, but still requires a stable 5V regulator or USB supply for dependable operation.',
    codeSnippet: {
      language: 'cpp',
      description: 'Basic Nano setup with servo control',
      code: `#include <Servo.h>
Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  myServo.write(90);
  delay(1000);
  myServo.write(0);
  delay(1000);
}`
    },
    applications: ['Compact robots', 'Sensor hubs', 'Debug boards', 'Wearable and small mobile systems'],
    troubleshooting: [
      {
        issue: 'Board is not recognized by the PC.',
        solution: 'Check the USB cable, port, and bootloader state. Some Nano clones need the correct USB driver or a reliable cable.'
      }
    ],
    externalDocLinks: [
      { label: 'Arduino Nano Documentation', url: 'https://docs.arduino.cc/hardware/nano/' }
    ]
  },
  {
    id: 'doc-08',
    slug: 'esp32-wifi-bluetooth-robotics',
    category: 'Microcontrollers',
    categorySlug: 'microcontrollers',
    title: 'ESP32: Wi-Fi, Bluetooth, and Sensor Fusion Ready',
    summary: 'A dual-core microcontroller for wireless robots, telemetry, web dashboards, and multitasking projects.',
    difficulty: 'Intermediate',
    readTime: '8 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Embedded Systems Team',
    tags: ['ESP32', 'Wi-Fi', 'Bluetooth', 'FreeRTOS'],
    introduction: 'The ESP32 is one of the most useful boards in robotics because it combines a powerful MCU with built-in Wi-Fi and Bluetooth connectivity. This makes it ideal for robot telemetry, remote control, and sensor networks.',
    howItWorks: 'The ESP32 uses dual cores that can run multiple tasks simultaneously, which is useful when one task handles PID control and another handles wireless communication or logging.',
    specifications: [
      { label: 'CPU', value: 'Dual-core Xtensa LX6' },
      { label: 'Clock Speed', value: '240 MHz' },
      { label: 'Operating Voltage', value: '3.3V' },
      { label: 'GPIO', value: '34 programmable GPIOs' },
      { label: 'Wireless', value: '2.4GHz Wi-Fi + Bluetooth' }
    ],
    wiringNotes: 'Never drive motors from the 3.3V rail. Use proper motor driver boards and ensure the sensor grounds are common with the controller ground.',
    codeSnippet: {
      language: 'cpp',
      description: 'ESP32 Wi-Fi startup and serial print',
      code: `#include <WiFi.h>

const char* ssid = "RTIST";
const char* password = "robotics";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected");
}

void loop() {
  Serial.println(WiFi.localIP());
  delay(5000);
}`
    },
    applications: ['Wireless robot control', 'Remote telemetry', 'Sensor networks', 'Robotics dashboards'],
    troubleshooting: [
      {
        issue: 'Wi-Fi disconnects during motion.',
        solution: 'Keep the antenna clear of motors and use proper decoupling capacitors. Motor noise can destabilize a weak Wi-Fi connection.'
      }
    ],
    externalDocLinks: [
      { label: 'ESP32 Official Documentation', url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/' },
      { label: 'Arduino ESP32 Docs', url: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/' }
    ]
  },
  {
    id: 'doc-09',
    slug: 'raspberry-pi-pico-microcontroller',
    category: 'Microcontrollers',
    categorySlug: 'microcontrollers',
    title: 'Raspberry Pi Pico: Microcontroller for Real-Time Robot Control',
    summary: 'A low-cost microcontroller board with powerful GPIO and ADC capabilities for embedded robotics.',
    difficulty: 'Intermediate',
    readTime: '7 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Embedded Systems Team',
    tags: ['Raspberry Pi', 'Pico', 'Microcontroller', 'GPIO'],
    introduction: 'The Raspberry Pi Pico is a compact controller aimed at embedded and low-cost robotics development. It is especially useful when a project needs efficient control with GPIO, PWM, ADC, and rich peripheral support.',
    howItWorks: 'The RP2040 microcontroller on Pico runs embedded firmware written in C/C++ or MicroPython. It is commonly used as a dedicated controller for sensors, motor drivers, and real-time control loops.',
    specifications: [
      { label: 'MCU', value: 'RP2040' },
      { label: 'CPU', value: 'Dual-core Cortex-M0+' },
      { label: 'Operating Voltage', value: '3.3V' },
      { label: 'GPIO', value: '26 multi-function pins' },
      { label: 'ADC', value: '3 ADC channels' }
    ],
    wiringNotes: 'Use level-shifting if your sensor or driver requires 5V logic. Keep the supply clean and decouple the board close to the power pins.',
    codeSnippet: {
      language: 'cpp',
      description: 'Pico GPIO blink example',
      code: `#include "pico/stdlib.h"

int main() {
  stdio_init_all();
  gpio_init(PICO_DEFAULT_LED_PIN);
  gpio_set_dir(PICO_DEFAULT_LED_PIN, GPIO_OUT);

  while (true) {
    gpio_put(PICO_DEFAULT_LED_PIN, 1);
    sleep_ms(200);
    gpio_put(PICO_DEFAULT_LED_PIN, 0);
    sleep_ms(200);
  }
}`
    },
    applications: ['Sensor interfaces', 'Low-cost motor controllers', 'Small autonomous prototypes', 'Embedded control loops'],
    troubleshooting: [
      {
        issue: 'GPIO reads unstable values.',
        solution: 'Check the board ground and add a stable pull-up or pull-down configuration if the sensor output is floating.'
      }
    ],
    externalDocLinks: [
      { label: 'Raspberry Pi Pico Documentation', url: 'https://www.raspberrypi.com/documentation/' }
    ]
  },
  {
    id: 'doc-10',
    slug: 'hc-sr04-ultrasonic-sensor',
    category: 'Sensors',
    categorySlug: 'sensors',
    title: 'HC-SR04 Ultrasonic Distance Sensor',
    summary: 'A low-cost ultrasonic sensor used for obstacle detection and simple ranging in mobile robots.',
    difficulty: 'Beginner',
    readTime: '6 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Sensors Team',
    tags: ['HC-SR04', 'Ultrasonic', 'Distance', 'Obstacle Avoidance'],
    introduction: 'The HC-SR04 measures distance by sending an ultrasonic pulse and timing how long it takes the echo to return. This makes it useful for simple obstacle detection and front-range sensing on robots.',
    howItWorks: 'The sensor emits a short ultrasonic pulse using a transmitter, then listens for the reflected echo using a receiver. The time difference is converted to distance using the speed of sound in air.',
    specifications: [
      { label: 'Operating Voltage', value: '5V' },
      { label: 'Measurement Range', value: '2 cm to 400 cm' },
      { label: 'Interface', value: 'Trigger + Echo' },
      { label: 'Update Rate', value: 'Typically low to moderate' }
    ],
    wiringNotes: 'Keep the sensor wiring short and avoid placing the module close to noisy motor wiring. Mounting it with a stable frame reduces false readings.',
    codeSnippet: {
      language: 'cpp',
      description: 'HC-SR04 distance reading using Arduino',
      code: `const int trigPin = 9;
const int echoPin = 10;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distanceCm = duration * 0.0343 / 2.0;
  Serial.println(distanceCm);
  delay(100);
}`
    },
    applications: ['Obstacle avoidance', 'Wall following', 'Distance estimation', 'Simple robotics ranging'],
    troubleshooting: [
      {
        issue: 'Readings jump around randomly.',
        solution: 'Ensure a stable 5V supply, short wiring, and no ground loops. Motors nearby can inject electrical noise.'
      }
    ],
    externalDocLinks: [
      { label: 'HC-SR04 Product Reference', url: 'https://www.sparkfun.com/products/15569' }
    ]
  },
  {
    id: 'doc-11',
    slug: 'vl53l0x-tof-sensor',
    category: 'Sensors',
    categorySlug: 'sensors',
    title: 'VL53L0X Time-of-Flight Sensor',
    summary: 'A compact time-of-flight ranging sensor for precise short-range measurement over I2C.',
    difficulty: 'Intermediate',
    readTime: '7 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Sensors Team',
    tags: ['VL53L0X', 'ToF', 'I2C', 'Range'],
    introduction: 'The VL53L0X uses precise time-of-flight measurements to determine distance with better accuracy than many basic ultrasonic modules at short ranges.',
    howItWorks: 'A laser pulse is emitted and the sensor measures the time the reflected signal takes to return. This is processed by an onboard timing controller and made available over I2C.',
    specifications: [
      { label: 'Operating Voltage', value: '2.6V to 5.5V' },
      { label: 'Interface', value: 'I2C' },
      { label: 'Range', value: 'Up to ~2 m depending on calibration and conditions' },
      { label: 'Accuracy', value: 'Best in short range, environment-dependent' }
    ],
    wiringNotes: 'Use the sensor board’s normal I2C pull-ups and keep the board away from strong ambient light or reflective surfaces that can distort readings.',
    codeSnippet: {
      language: 'cpp',
      description: 'Basic VL53L0X distance read example',
      code: `#include <Wire.h>
#include <VL53L0X.h>

VL53L0X sensor;

void setup() {
  Wire.begin();
  sensor.init();
  sensor.setTimeout(500);
  sensor.startContinuous();
}

void loop() {
  Serial.println(sensor.readRangeContinuousMillimeters());
  delay(100);
}`
    },
    applications: ['Short-range obstacle detection', 'Robot docking', 'Tabletop ranging', 'Smart sensor arrays'],
    troubleshooting: [
      {
        issue: 'Distance reads are extremely noisy.',
        solution: 'Check I2C pull-ups, power stability, and whether the target surface is strongly reflective or too close to the sensor minimum range.'
      }
    ],
    externalDocLinks: [
      { label: 'ST VL53L0X Product Page', url: 'https://www.st.com/en/imaging-and-photonics-solutions/vl53l0x.html' }
    ]
  },
  {
    id: 'doc-12',
    slug: 'mpu6050-imu-sensor',
    category: 'Sensors',
    categorySlug: 'sensors',
    title: 'MPU6050 IMU: Measuring Motion and Rotation',
    summary: 'A 6-axis inertial measurement unit commonly used for balancing robots, orientation estimation, and motion sensing.',
    difficulty: 'Intermediate',
    readTime: '6 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Control Systems Team',
    tags: ['MPU6050', 'IMU', 'Gyro', 'Accelerometer'],
    introduction: 'An IMU gives a robot information about acceleration and angular velocity. This makes it useful for balancing mechanisms, drive stabilization, and motion feedback.',
    howItWorks: 'The MPU6050 combines a 3-axis accelerometer and a 3-axis gyroscope, both connected to a digital interface and typically read over I2C. The raw data is then fused to estimate orientation and movement.',
    specifications: [
      { label: 'Interface', value: 'I2C' },
      { label: 'Axes', value: '6-axis' },
      { label: 'Supply Voltage', value: '3.3V to 5V typical modules' },
      { label: 'Use Case', value: 'Tilt, rotation, and motion estimation' }
    ],
    wiringNotes: 'Keep the IMU near the robot’s center of rotation and isolate it from vibration if possible. Motor vibration can distort the gyro and accelerometer data.',
    codeSnippet: {
      language: 'cpp',
      description: 'Read accelerometer and gyro values from MPU6050',
      code: `#include <Wire.h>
#include <MPU6050.h>

MPU6050 imu;

void setup() {
  Wire.begin();
  imu.initialize();
  Serial.begin(115200);
}

void loop() {
  int16_t ax, ay, az, gx, gy, gz;
  imu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  Serial.print(ax); Serial.print(" ");
  Serial.print(ay); Serial.print(" ");
  Serial.println(az);
  delay(50);
}`
    },
    applications: ['Self-balancing robots', 'Drive stabilization', 'Orientation estimation', 'Gesture sensing'],
    troubleshooting: [
      {
        issue: 'Accelerometer data looks noisy or drifting.',
        solution: 'Reduce vibration, power the module with stable voltage, and use calibration offsets for your fixed mounting orientation.'
      }
    ],
    externalDocLinks: [
      { label: 'InvenSense MPU6050 Documentation', url: 'https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/' }
    ]
  },
  {
    id: 'doc-13',
    slug: 'l298n-dual-h-bridge-driver',
    category: 'Motor Drivers',
    categorySlug: 'motor-drivers',
    title: 'L298N Dual H-Bridge Motor Driver',
    summary: 'A classic dual H-bridge driver used to control the direction and speed of DC motors.',
    difficulty: 'Beginner',
    readTime: '6 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Electronics Team',
    tags: ['L298N', 'H-Bridge', 'Motor Driver', 'DC Motor'],
    introduction: 'The L298N is a widely used motor driver board that allows a microcontroller to drive two DC motors or one stepper motor using PWM for speed control and logic pins for direction.',
    howItWorks: 'The H-bridge reverses current through the motor so it can move forward or backward. PWM signals from the microcontroller control average power delivered to the motor.',
    specifications: [
      { label: 'Motor Supply', value: 'Up to 46V depending on module' },
      { label: 'Logic Supply', value: '5V' },
      { label: 'Peak Current', value: 'Typically several amps per channel with thermal limitations' },
      { label: 'Control', value: 'PWM + direction pins' }
    ],
    wiringNotes: 'The L298N board is not ideal for very high efficiency or compact designs because it dissipates significant heat. It is still useful for learning H-bridges and basic motor control.',
    codeSnippet: {
      language: 'cpp',
      description: 'L298N motor control using Arduino',
      code: `const int in1 = 8;
const int in2 = 9;
const int enA = 10;

void setup() {
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(enA, OUTPUT);
}

void loop() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  analogWrite(enA, 180);
  delay(1000);
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  analogWrite(enA, 180);
  delay(1000);
}`
    },
    applications: ['Simple 2WD robots', 'Learning motor control', 'Educational prototypes', 'Small DC drive systems'],
    troubleshooting: [
      {
        issue: 'Motor gets hot quickly.',
        solution: 'The board may be dissipating too much power. Use a higher-efficiency driver or add better heat sinking and current limits.'
      }
    ],
    externalDocLinks: [
      { label: 'ST L298N Product Docs', url: 'https://www.st.com/en/motor-drivers/l298.html' }
    ]
  },
  {
    id: 'doc-14',
    slug: 'n20-geared-dc-motor',
    category: 'Motors & Actuators',
    categorySlug: 'motors-actuators',
    title: 'N20 Geared DC Motor: Small Torque, High Precision',
    summary: 'A compact geared motor frequently used in small robot drivetrains, wheels, and actuators.',
    difficulty: 'Beginner',
    readTime: '5 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Mechanical Team',
    tags: ['DC Motor', 'Gearbox', 'Torque', 'Robot Drive'],
    introduction: 'The N20 motor is prized for its compact geometry and decent torque after gearing. It is a common choice for mini robots, camera gimbals, and small mobile systems.',
    howItWorks: 'An N20 motor spins a gearbox to trade speed for torque. The chosen gear ratio changes the output torque and shaft speed, making it useful for robot wheel drives and careful actuation.',
    specifications: [
      { label: 'Typical Supply', value: '3V to 12V depending on variant' },
      { label: 'Common Use', value: 'Small drivetrain and actuator' },
      { label: 'Output', value: 'Gear-reduced shaft speed' }
    ],
    wiringNotes: 'Check the motor’s stall current and supply rating before choosing a driver. Small motors can still demand significant current when stalled.',
    applications: ['Mini robots', 'Gear pumps', 'Camera motion', 'Low-cost drive systems'],
    troubleshooting: [
      {
        issue: 'Robot stalls under load.',
        solution: 'The wheel torque requirement is greater than the motor can provide. Increase motor torque, reduce load, or switch to a higher-power drive train.'
      }
    ],
    externalDocLinks: [
      { label: 'Pololu Motor Documentation', url: 'https://www.pololu.com/resources/documentation' }
    ]
  },
  {
    id: 'doc-15',
    slug: 'sg90-servo-motor',
    category: 'Motors & Actuators',
    categorySlug: 'motors-actuators',
    title: 'SG90 Servo: Precise Angle Control',
    summary: 'A light-duty hobby servo used in robotics for steering, grippers, and simple actuators.',
    difficulty: 'Beginner',
    readTime: '5 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Mechatronics Team',
    tags: ['Servo', 'PWM', 'Actuator', 'Angle Control'],
    introduction: 'Servos are closed-loop position actuators that accept a pulse-width signal and rotate to a corresponding angle. This makes them ideal for camera tilt, grippers, and steering tails.',
    howItWorks: 'A PWM signal is interpreted as a target angle. The servo’s internal electronics drive the motor until the shaft reaches the requested position and holds it.',
    specifications: [
      { label: 'Control Signal', value: 'PWM' },
      { label: 'Operating Voltage', value: 'Typically 4.8V to 6V' },
      { label: 'Typical Torque', value: 'Varies by variant and load' }
    ],
    wiringNotes: 'Do not power a servo directly from a microcontroller GPIO. Always use a dedicated power rail or a regulated supply capable of handling startup torque and current bursts.',
    codeSnippet: {
      language: 'cpp',
      description: 'Basic SG90 servo control with Arduino',
      code: `#include <Servo.h>
Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  myServo.write(0);
  delay(1000);
  myServo.write(90);
  delay(1000);
  myServo.write(180);
  delay(1000);
}`
    },
    applications: ['Grippers', 'Steering mechanisms', 'Pan-tilt heads', 'Robotic arms'],
    troubleshooting: [
      {
        issue: 'Servo jitters or stalls.',
        solution: 'Check the supply voltage and ensure the signal line is not overloaded. Servo startup current often exceeds what a small regulator or GPIO can support.'
      }
    ],
    externalDocLinks: [
      { label: 'Servo Library Reference', url: 'https://www.arduino.cc/reference/en/libraries/servo/' }
    ]
  },
  {
    id: 'doc-16',
    slug: 'powering-a-robot-correctly',
    category: 'Power Systems',
    categorySlug: 'power-systems',
    title: 'Powering a Robot Correctly',
    summary: 'Design clean power paths for motors, logic, and sensors so your robot remains stable under load.',
    difficulty: 'Beginner',
    readTime: '8 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Power Systems Team',
    tags: ['Battery', 'Power Distribution', 'Regulator', 'Motor Power'],
    introduction: 'Robots often fail because the power system is treated as an afterthought. Motors and logic electronics have different requirements, and a single weak rail can cause resets, brownouts, and unpredictable behavior.',
    howItWorks: 'The battery feeds the power distribution system, which then supplies motor drivers and logic rails. Motors should have a low-impedance path and separate filtering from sensitive control electronics.',
    specifications: [
      { label: 'Battery Path', value: 'Battery → Fuse → Distribution → Driver → Motor' },
      { label: 'Logic Path', value: 'Battery → Regulator → MCU / Sensors' },
      { label: 'Optimization', value: 'Separate noise-sensitive and high-current paths' }
    ],
    wiringNotes: 'Use a fuse close to the battery, keep the ground plane solid, and consider separate paths for power-hungry motors and logic circuits to prevent voltage dips.',
    applications: ['Drive systems', 'RPi robot controllers', 'Sensor hubs', 'Mobile robots'],
    troubleshooting: [
      {
        issue: 'MCU resets when the motors start.',
        solution: 'Motor startup current is pulling down the supply. Add bulk capacitance, a better power distribution board, and a separate regulated rail for logic.'
      }
    ],
    externalDocLinks: [
      { label: 'Raspberry Pi Power Supply Guidance', url: 'https://www.raspberrypi.com/documentation/computers/raspberry-pi.html' }
    ]
  },
  {
    id: 'doc-17',
    slug: 'ros2-fundamentals-for-robotics',
    category: 'ROS 2 & Advanced',
    categorySlug: 'ros2-advanced',
    title: 'ROS 2 Fundamentals for Robotics',
    summary: 'Learn the core ROS 2 concepts: nodes, topics, services, actions, and parameters used in robot systems.',
    difficulty: 'Advanced',
    readTime: '10 min read',
    lastUpdated: '2026-08-20',
    author: 'RTIST Autonomous Systems Team',
    tags: ['ROS 2', 'Topics', 'Nodes', 'Navigation'],
    introduction: 'ROS 2 is a middleware framework used to connect sensors, controllers, visualization tools, and autonomous planners. It gives a robot a clean architecture for communication and coordination.',
    howItWorks: 'Each component runs as a node. Nodes publish and subscribe to topics, call services, and exchange data in a decoupled architecture which makes large robot systems easier to build and debug.',
    specifications: [
      { label: 'Middleware', value: 'DDS-based communication' },
      { label: 'Core Concepts', value: 'Nodes, topics, services, actions, parameters' },
      { label: 'Common Use', value: 'Robotics orchestration and sensor integration' }
    ],
    wiringNotes: 'For a robot, think of ROS 2 as the software bus. Sensors, controllers, and planners can be connected without hard-coding every dependency into a single program.',
    codeSnippet: {
      language: 'python',
      description: 'Minimal ROS 2 publisher example',
      code: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.pub = self.create_publisher(String, 'chatter', 10)
        self.timer = self.create_timer(1.0, self.publish_message)

    def publish_message(self):
        msg = String()
        msg.data = 'hello from RTIST'
        self.pub.publish(msg)

rclpy.init()
node = Talker()
rclpy.spin(node)
node.destroy_node()
rclpy.shutdown()`
    },
    applications: ['Robot control stacks', 'Mapping pipelines', 'Perception systems', 'Autonomous navigation'],
    troubleshooting: [
      {
        issue: 'Topics do not appear as expected.',
        solution: 'Check that the nodes are running and that topic names match exactly. ROS 2 is strict about names and message types.'
      }
    ],
    externalDocLinks: [
      { label: 'ROS 2 Documentation', url: 'https://docs.ros.org/en/humble/' }
    ]
  }
];
