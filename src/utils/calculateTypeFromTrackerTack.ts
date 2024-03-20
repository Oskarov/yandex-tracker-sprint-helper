const CalculateTypeFromTrackerTack = (type: string) => {
    switch (type) {
        case 'devtask':
            return 3;
        default:
            return 1;
    }
}

export default CalculateTypeFromTrackerTack;