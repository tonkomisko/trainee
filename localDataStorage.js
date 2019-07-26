function setLocalDataStorage(storageName,storageValue) {
    var currentTimeStamp = new Date().toISOString();
    localDataStorage.remove(storageName);
    localStorage.setItem(storageName,JSON.stringify({timestamp: currentTimeStamp, storagevalue: storageValue}));
}

function getLocalDataStorage(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
}

function removeLocalDataStorage(storageName) {
    localStorage.removeItem(storageName);
}

export const localDataStorage = {
    set: setLocalDataStorage, 
    get: getLocalDataStorage,
    remove: removeLocalDataStorage
}