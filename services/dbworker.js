const db = require('./db');
const helper = require('../helper');
const config = require('./config');

moment = require('moment')
//LIMIT ${offset} OFFSET ${config.listPerPage}

async function getMultiple(page = 1){
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM weight_data`
  );
  const data = rows.rows
  //const data = helper.emptyOrRows(rows);
  //const meta = 1;

  return {
    data
  }
}

async function getById(id){
  const rows = await db.query(
    `SELECT *
    FROM weight_data
    WHERE rfid='${id}'`
  );
  const data = rows.rows
  return {data}
}

async function create(dbtimbangan){
  let result
  let message = 'Error in creating weight data entry';
  const datacheck = await db.query(
    `SELECT *
    FROM weight_data
    WHERE rfid='${dbtimbangan.id}'`
  );
  if (datacheck.rows.length == 0){
    result = await db.query(
      `INSERT INTO "weight_data" ("animal_name", "rfid", "animal_species", "weight_before", "weight_after", "created_at", "last_updated") 
      VALUES ('${dbtimbangan.animal_name}', '${dbtimbangan.id}', '${dbtimbangan.animal_species}', '${dbtimbangan.weight}', '0', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.000')}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.000')}')`
    );
    if (result.rowCount) {
      message = 'Weight data created successfully';
    }
  } else if (datacheck.rows.length != 0){
    update(dbtimbangan.id, dbtimbangan)
  }  
    return {message};
  }

async function update(id, dbtimbangan){
  const result = await db.query(
    `UPDATE weight_data 
    SET weight_after='${dbtimbangan.weight}', last_updated='${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}'
    WHERE rfid='${id}'` 
  );

  let message = 'Error in updating weight data entry';
  
  if (result.rowCount) {
    message = 'Weight data updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM weight_data WHERE rfid = '${id}'`
  );

  let message = 'Error in deleting weight data entry';

  if (result.rowCount) {
    message = `Weight data from ${id} deleted successfully`;
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getById
}