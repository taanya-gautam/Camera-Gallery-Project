//(1) create a database
// (2) create objectStore -> can be created only in upgradeneeded event
//The IDBObjectStore interface of the IndexedDB API represents an object store in a database. 
//Records within an object store are sorted according to their keys. This sorting enables fast insertion, look-up, and ordered retrieval.

//(3) make transactions

let db;
let openRequest = indexedDB.open("myDataBase" , 2);      // database version -1 (by default)
openRequest.addEventListener("success" , (e) => {
    console.log("DB success");
    db = openRequest.result;

})
openRequest.addEventListener("error" , (e) => {
    console.log("DB error");
    
})
openRequest.addEventListener("upgradeneeded" , (e) => {
    console.log("DB upgraded & also for initial db creation");
    db = openRequest.result;

    db.createObjectStore("video" , { keyPath : "id"});
    db.createObjectStore("image" , { keyPath : "id"});

    
})



