const MAIN_TEST_TITLE_ = "QUnitGS2 Test";
var QUnit = QUnitGS2.QUnit;
let endpoint = "https://noah.energy/version-test/api/1.1/obj/Company";
const rootFolderIDTEST = "1KYihGXQpXfmr8EyQ-wgszRxFMsT9MqBM";

function doTest() {
  QUnit.config.title = MAIN_TEST_TITLE_;
  QUnitGS2.init();
  tests();
  QUnit.start();
  return QUnitGS2.getHtml();
}

function TestCompanies() {
  let data = getDataFromAPI(endpoints[0]);
  let folder = folderManage(endpoints[0], rootFolderIDTEST);

  QUnit.module("folder Company");

  QUnit.test("Test Companies", function (assert) {
    assert.equal(folderManage(endpoints[0], rootFolderIDTEST), "Company");
    assert.ok(manageDocument(folder, data), "non-empty string");
    assert.ok(getDataFromAPI(endpoints[0]), "non-empty string");
  });
}

function TestUsers() {
  let data = getDataFromAPI(endpoints[2]);
  let folder = folderManage(endpoints[2], rootFolderIDTEST);

  QUnit.module("folder User");

  QUnit.test("Test Users", function (assert) {
    assert.equal(folderManage(endpoints[2], rootFolderIDTEST), "User");
    assert.ok(manageDocument(folder, data), "non-empty string");
    assert.ok(getDataFromAPI(endpoints[2]), "non-empty string");
  });
}

function TestLoans() {
  let data = getDataFromAPI(endpoints[1]);
  let folder = folderManage(endpoints[1], rootFolderIDTEST);

  QUnit.module("folder Loans");

  QUnit.test("Test Loans", function (assert) {
    assert.ok(folderManage(endpoints[2], rootFolderIDTEST), "non-empty string");
    assert.ok(manageDocument(folder, data), "non-empty string");
    assert.ok(getDataFromAPI(endpoints[2]), "non-empty string");
  });
}

function tests() {
  TestCompanies();
  TestLoans();
  //TestUsers();
}
function getResultsFromServer() {
  return QUnitGS2.getResultsFromServer();
}
