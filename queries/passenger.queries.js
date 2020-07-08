const db = require("../db");

exports.getPassengerData = async (ci) => {
  const c = await db.getConnection();
  const passengerData = await c.query(
    "select p.ci, p.name, p.lastname, p.mlastname, p.phone, p.neighborhood, p.street, p.number, p.birthdate," +
      " c.idcard, c.residue, " +
      " ct.name as cardtype, cs.name as cardstate, r.name as role," +
      " d.login" +
      " from person as p, card as c, cardstate as cs, cardtype as ct, role as r, data as d, data_role as dr" +
      " where p.ci=c.ci and p.ci=d.ci and d.ci=dr.ci" +
      " and dr.idrole=r.idrole and c.idtype=ct.idtype and c.idstate=cs.idstate" +
      " and dr.idrole=3 and p.ci=? ",
    [ci]
  );
  c.release();
  return passengerData[0][0];
};

exports.getPassengerDataByCi = async (ci) => {
  const c = await db.getConnection();
  const passengerData = await c.query(
    "select p.ci, p.name, p.lastname, p.mlastname, d.login" +
      " from person as p, data as d, data_role as dr" +
      " where p.ci=d.ci and d.ci=dr.ci and dr.idrole=3 and p.ci=? ",
    [ci]
  );
  c.release();
  return passengerData[0][0];
};

exports.getPassengePaymentsByIDCardAndCI = async (idcard, ci) => {
  const c = await db.getConnection();
  const passengerPayments = await c.query(
    "select r.idcard, r.ci, p.name, p.lastname, p.mlastname, r.date, r.amount, r.reader" +
      " from person as p, card as c, report as r" +
      " where p.ci=c.ci and c.idcard=r.idcard and r.idreport=1 and r.idcard=? and r.ci=? order by r.date desc",
    [idcard, ci]
  );
  c.release();
  return passengerPayments[0];
};

exports.getPassengeTopUpsByIDCardAndCI = async (idcard, ci) => {
  const c = await db.getConnection();
  const passengerTopUps = await c.query(
    "select r.idcard, r.ci, p.name, p.lastname, p.mlastname, r.date, r.amount" +
      " from person as p, card as c, report as r" +
      " where p.ci=c.ci and c.idcard=r.idcard and r.idreport=2 and r.idcard=? and r.ci=? order by r.date desc",
    [idcard, ci]
  );
  c.release();
  return passengerTopUps[0];
};

exports.editPassengerLoginAndPassword = async (ci, { login, password }) => {
  const c = await db.getConnection();
  await c.query(
    "update data as d, data_role as dr set d.login=?, d.password=? where d.ci=? and dr.idrole=3",
    [login, password, ci]
  );
  c.release();
};
