const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'yourcity1.aternos.me', 
        port: 49149,                  
        username: 'AFK_Bot_Manager',
        version: false, // يختار الإصدار تلقائياً بناءً على السيرفر ليتوافق مع 1.21.4 أو غيره
        checkTimeoutInterval: 60000
    });

    bot.on('login', () => {
        console.log('✅ تم تسجيل الدخول بنجاح!');
    });

    bot.on('spawn', () => {
        console.log('🤖 البوت داخل السيرفر الآن ويقوم بالقفز لمنع الطرد.');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('end', () => {
        console.log('🔄 انقطع الاتصال، جاري إعادة المحاولة...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('❌ حدث خطأ: ' + err);
    });
}

createBot();
