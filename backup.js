const API_TOKEN = "a122c11578195d89c24bc4c1ecabf8bf";
const rootFolderID = "15ZPDA9yOoUTYX_zgdjrtb0zLuUGlxSFb";
const UATRootFolder = "1KYihGXQpXfmr8EyQ-wgszRxFMsT9MqBM";
const endpoints = [
  "https://noah.energy/version-test/api/1.1/obj/Company",
  "https://noah.energy/version-test/api/1.1/obj/Loan",
  "https://noah.energy/version-test/api/1.1/obj/User",
  "https://noah.energy/version-test/api/1.1/obj/AMLApproval",
  "https://noah.energy/version-test/api/1.1/obj/CreditApproval",
  "https://noah.energy/version-test/api/1.1/obj/BeneficialOwner",
  "https://noah.energy/version-test/api/1.1/obj/Payment",
];

function doGet(e) {
  if (e.parameter.name === "test") {
    doTest();
    return ContentService.createTextOutput(
      "Success: test completed successfully"
    );
  } else if (e.parameter.name === "UAT") {
    let response = backup(UATRootFolder);
    return ContentService.createTextOutput(response);
  } else if (e.parameter.name === "production") {
    let response = backup(rootFolderID);
    return ContentService.createTextOutput(response);
  } else if (e.parameter.name === "rotate") {
    let responseUAT = rotate(UATRootFolder) + " for UAT folder";
    let responseProd = rotate(rootFolderID) + " for prod folder";
    return ContentService.createTextOutput(responseUAT + " " + responseProd);
  }
}

function backup(rootFolder) {
  for (var i = 0; i < endpoints.length; i++) {
    let data = getDataFromAPI(endpoints[i]);
    let folder = folderManage(endpoints[i], rootFolder);
    manageDocument(folder, data);
  }
  return 200;
}

function folderManage(endpoint, rootFolderID) {
  let root = DriveApp.getFolderById(rootFolderID);
  let folderName = endpoint.split("/")[7];
  let folder = root.getFoldersByName(folderName);
  if (folder.hasNext()) {
    return folder.next();
  }
}

function manageDocument(folder, data) {
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy");
  let folderName = folder.getName();
  let fileName = date + " " + "Bubble" + " " + folderName + "Data.json";
  var file = folder.createFile(fileName, JSON.stringify(data), "text/plain");
  return Logger.log(file.getUrl());
}

function getDataFromAPI(endpoint) {
  var response = UrlFetchApp.fetch(endpoint, {
    method: "get",
    muteHttpExceptions: true,
    headers: {
      Authorization: "Bearer " + API_TOKEN,
    },
  });

  return JSON.parse(response).response.results;
}

function rotate() {
  let rootFolder = DriveApp.getFolderById(UATRootFolder);
  let folderIterator = rootFolder.getFolders();
  while (folderIterator.hasNext()) {
    let file = getFilesByDate(folderIterator.next().getId());
    file && file.setTrashed(true) && Logger.log("success");
  }
  return "Success";
}

function getFilesByDate(folderId) {
  let rootFolder = DriveApp.getFolderById(UATRootFolder);
  //var ThirtyDaysBeforeNow = new Date().getTime()-3600*1000*24*30;
  var ThirtyDaysBeforeNow = new Date().getTime();
  let cutOffDate = Utilities.formatDate(
    new Date(ThirtyDaysBeforeNow),
    "GMT+1",
    "yyyy-MM-dd"
  );
  Logger.log("cuttOfDate " + cutOffDate);
  let finds = DriveApp.getFolderById(folderId).searchFiles(
    `modifiedDate < "${cutOffDate}"`
  );
  if (finds.hasNext()) {
    let find = finds.next();
    Logger.log(find.getName());
    return find;
  }
}
