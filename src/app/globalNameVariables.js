// can be 'test' or 'prod'
export const env = "prod";

export const namesMap = {
    "test": {
        "userData_export_file_name": "userData_warfarm_TEST",
        "userData": "userData_warfarm_test",
        "basePath": "/warfarm-test",
        "titleName": "Warfarm TEST"
    },
    "prod": {
        "userData_export_file_name": "userData_warfarm",
        "userData": "userData",
        "basePath": "/warfarm",
        "titleName": "Warfarm"
    }
};

export const names = namesMap[env];
