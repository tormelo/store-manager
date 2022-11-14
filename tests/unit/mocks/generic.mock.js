const insertResponse = [
  {
    fieldCount: 0,
    affectedRows: 4,
    insertId: 0,
    info: 'Records: 2  Duplicates: 2  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]

const updateResponse = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  },
  undefined
];

const invalidUpdateResponse = [
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: 'Rows matched: 0  Changed: 0  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
  },
  undefined
];

const deleteResponse = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const invalidDeleteResponse = [
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

module.exports = {
  insertResponse,
  updateResponse,
  invalidUpdateResponse,
  deleteResponse,
  invalidDeleteResponse,
}