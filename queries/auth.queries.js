const db = require("../db");

exports.loginPassenger = async (login) => {
  const c = await db.getConnection();
  const passenger = await c.query(
    "select p.ci, p.name, p.lastname, p.mlastname, p.phone, p.neighborhood, p.street," +
      " p.number, p.birthdate, d.login, d.password, d.state, r.name as role" +
      " from person as p, data as d, role as r, data_role as dr" +
      " where p.ci=d.ci and d.ci=dr.ci and dr.idrole=r.idrole and dr.idrole=3 and d.login=? ",
    [login]
  );
  c.release();
  return passenger[0][0];
};

exports.getPassengerWithCard = async (idcard) => {
  const c = await db.getConnection();
  const passenger = await c.query(
    "select c.idcard, p.ci, p.name, p.lastname, p.mlastname" +
      " from person as p, card as c" +
      " where p.ci=c.ci and c.idcard=?",
    [idcard]
  );
  c.release();
  return passenger[0][0];
};

exports.getPassengerWithData = async (ci) => {
  const c = await db.getConnection();
  const passenger = await c.query(
    "select ci from data_role where ci=? and idrole=3",
    [ci]
  );
  c.release();
  return passenger[0][0];
};

exports.getPassengerDataByIDcard = async (idcard) => {
  const c = await db.getConnection();
  const passengerCI = await c.query(
    "select c.idcard, p.ci, p.name, p.lastname, p.mlastname" +
      " from card as c, person as p " +
      " where c.ci=p.ci and c.idcard=?",
    [idcard]
  );
  c.release();
  return passengerCI[0][0];
};

exports.registerPassenger = async ({ ci, login, password }) => {
  const c = await db.getConnection();
  try {
    await c.query("insert into data values (?,?,?,1)", [ci, login, password]);

    await c.query("insert into data_role values (?,3)", [ci]);
  } finally {
    c.release();
  }
};
