module.exports = (req, res) => {
    // 获取 New-API 传过来的金额和支付类型
    const money = req.query.money || '5.00';
    const type = req.query.type || 'wxpay';

    // 判断支付通道
    const qrcode = (type === 'alipay') ? '/ali.png' : '/wx.png';
    const payName = (type === 'alipay') ? '支付宝' : '微信支付';
    const themeColor = (type === 'alipay') ? '#00A0E9' : '#09BB07';

    // 直接输出完美渲染的 HTML 页面
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${payName}安全支付</title>
    <style>
        body { background: #f5f5f5; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; max-width: 360px; width: 90%; }
        .header { color: ${themeColor}; font-size: 22px; font-weight: bold; margin-bottom: 20px; }
        .money { font-size: 36px; font-weight: bold; margin: 10px 0; color: #333; }
        img { width: 240px; height: 240px; margin: 15px 0; border: 1px solid #eee; padding: 5px; border-radius: 4px; }
        .tip { color: #666; font-size: 14px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">${payName}</div>
        <div style="font-size:14px; color:#999;">应付金额</div>
        <div class="money">￥${parseFloat(money).toFixed(2)}</div>
        <img src="${qrcode}" alt="收款码">
        <div class="tip">请使用${payName}扫码支付</div>
        <div style="font-size:12px; color:#aaa; margin-top:15px;">支付完成后，家里挂机手机将自动通知系统加款</div>
    </div>
</body>
</html>
    `);
};