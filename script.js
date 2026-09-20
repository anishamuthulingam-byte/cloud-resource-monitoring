// ==========================================
// CLOUD RESOURCE MONITORING ENGINE
// ==========================================

// Simulated cloud resource data
const resources = [
    {
        id: "VM-001",
        type: "Virtual Machine",
        status: "Running",
        cpu: 75,
        ram: 60,
        storageAllocated: 200,
        storageUsed: 150
    },
    {
        id: "VM-002",
        type: "Virtual Machine",
        status: "Running",
        cpu: 8,
        ram: 12,
        storageAllocated: 500,
        storageUsed: 50
    },
    {
        id: "VM-003",
        type: "Virtual Machine",
        status: "Running",
        cpu: 65,
        ram: 55,
        storageAllocated: 250,
        storageUsed: 200
    },
    {
        id: "VM-004",
        type: "Virtual Machine",
        status: "Running",
        cpu: 5,
        ram: 9,
        storageAllocated: 1000,
        storageUsed: 100
    },
    {
        id: "VM-005",
        type: "Virtual Machine",
        status: "Stopped",
        cpu: 0,
        ram: 0,
        storageAllocated: 500,
        storageUsed: 100
    }
];


// ==========================================
// DETECTION RULES
// ==========================================

function detectProblems(resource) {

    const problems = [];

    // Idle VM detection
    if (
        resource.status === "Running" &&
        resource.cpu < 10 &&
        resource.ram < 15
    ) {
        problems.push({
            resource: resource.id,
            problem: "Idle VM",
            reason: "The VM is running with very low CPU and RAM utilization.",
            risk: "Allocated cloud capacity may continue to be consumed unnecessarily.",
            action: "Stop the VM after user approval."
        });
    }


    // Storage utilization
    const storageUtilization =
        (resource.storageUsed / resource.storageAllocated) * 100;


    // Over-provisioned storage detection
    if (storageUtilization < 20) {

        problems.push({
            resource: resource.id,
            problem: "Over-Provisioned Storage",
            reason:
                "A large amount of storage is allocated but only a small portion is being used.",
            risk:
                "Low utilization can result in inefficient allocation of cloud storage capacity.",
            action:
                "Optimize the storage allocation after user approval.",
            allocated:
                resource.storageAllocated,
            used:
                resource.storageUsed,
            utilization:
                storageUtilization.toFixed(1)
        });
    }

    return problems;
}


// ==========================================
// RUN MONITORING
// ==========================================

function monitorResources() {

    const detectedProblems = [];

    resources.forEach(resource => {

        const problems = detectProblems(resource);

        detectedProblems.push(...problems);

    });

    console.log("Cloud Monitoring Completed");

    console.log(
        "Problems Detected:",
        detectedProblems
    );

    return detectedProblems;
}


// ==========================================
// START MONITORING
// ==========================================

const detectedProblems = monitorResources();


// Make the results available to the website
window.cloudMonitoringResults = detectedProblems;
