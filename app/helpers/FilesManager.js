const firebaseAdmin = require("firebase-admin");
const fs = require("fs");

const upload = async ({fileToBeUploadedPath, fileName, folder}) => {
    const file = await firebaseAdmin.storage().bucket().upload(fileToBeUploadedPath, {
        destination: `${folder}/${fileName}`,
    });
    await file[0].makePublic();
    fs.unlinkSync(fileToBeUploadedPath);
    return `https://firebasestorage.googleapis.com/v0/b/${file[0].bucket.name}/o/${(encodeURI(file[0].metadata.name)).replace("\/", "%2F")}?alt=media`;
}

const uploadBuffer = async ({fileName, folder, buffer}) => {
    const file = await firebaseAdmin.storage().bucket().file(folder + "/" + fileName)
    await file.save(buffer)
    await file.makePublic()
    return `https://firebasestorage.googleapis.com/v0/b/${file.bucket.name}/o/${(encodeURI(file.metadata.name)).replace("\/", "%2F")}?alt=media`;
}

const deleteFile = async (filePath) => {
    await firebaseAdmin.storage().bucket().file(filePath).delete();
}

module.exports = {
    upload,
    deleteFile,
    uploadBuffer
}