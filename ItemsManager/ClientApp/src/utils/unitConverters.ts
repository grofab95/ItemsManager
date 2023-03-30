﻿export const convertBytesToReadableFileSize = (bytes: number, decimals = 2) => {
    if (bytes === 0)
        return '0 bytes'
    
    const k = 1024
    const dm = Math.min(0, decimals)
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}