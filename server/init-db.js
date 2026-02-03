// 建表脚本及初始数据写入脚本
const { sequelize, User, Hotel, RoomType } = require('./src/models');

async function initDB() {
  try {
    console.log('🔄 正在连接数据库...');
    // force: true 表示如果表存在，则删除重建
    await sequelize.sync({ force: true });
    console.log('✅ 表结构同步完成！');

    console.log('🌱 正在写入初始测试数据...');

    // 1. 创建用户 (展示用户名可以是不同格式)
    
    // 管理员：普通用户名
    const admin = await User.create({ 
      username: 'admin', 
      password: '123', 
      role: 'admin' 
    });

    // 商户：使用邮箱作为 username
    const merchant = await User.create({ 
      username: 'boss@hotel.com', 
      password: '123', 
      role: 'merchant' 
    });

    // 普通用户：使用手机号作为 username
    const user = await User.create({ 
      username: '13800138000', 
      password: '123', 
      role: 'user' 
    });

    // 2. 创建酒店 (挂载到商户名下)
    const hotel1 = await Hotel.create({
      name: '上海宝格丽酒店',
      address: '静安区山西北路108弄',
      city: '上海',
      price: 4800,
      star: 5,
      tags: ['豪华', '江景', 'SPA'],
      cover_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      status: 1, // 已发布
      merchant_id: merchant.id,
      latitude: 31.245,
      longitude: 121.48
    });

    const hotel2 = await Hotel.create({
      name: '全季酒店(北京国贸店)',
      address: '朝阳区建国路12号',
      city: '北京',
      price: 350,
      star: 3,
      tags: ['商务', '近地铁', '免费停车'],
      cover_image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      status: 1, // 已发布
      merchant_id: merchant.id,
      latitude: 39.90,
      longitude: 116.40
    }); 

    // 3. 创建房型
    await RoomType.bulkCreate([
      { name: '豪华江景房', price: 5200, stock: 5, hotel_id: hotel1.id },
      { name: '行政套房', price: 8800, stock: 2, hotel_id: hotel1.id },
      { name: '标准大床房', price: 350, stock: 20, hotel_id: hotel2.id },
      { name: '商务双床房', price: 380, stock: 15, hotel_id: hotel2.id }
    ]);

    console.log(`
    🎉 初始化成功！数据库已重置。
    ---------------------------------------------
    [管理员] 账号: admin           密码: 123
    [商 户] 账号: boss@hotel.com  密码: 123
    [用 户] 账号: 13800138000     密码: 123
    ---------------------------------------------
    `);
    process.exit(0);

  } catch (error) {
    console.error('❌ 初始化失败:', error);
    process.exit(1);
  }
}

initDB();