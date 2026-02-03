// [工具] 统一返回格式 {code, msg, data}

const success = (res, data = null, msg = 'Success') => {
  res.status(200).json({
    code: 200,
    msg,
    data
  });
};

const fail = (res, msg = 'Error', code = 400, data = null) => {
  res.status(code).json({
    code,
    msg,
    data
  });
};

module.exports = {
  success,
  fail
};
