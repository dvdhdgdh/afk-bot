const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'yourcity1.aternos.me', // عنوان سيرفرك
        port: 49149,                  // المنفذ الخاص بك
        username: 'AFK_Worker',       // اسم البوت داخل اللعبة
        version: '1.21.4',            // الإصدار الصحيح للسيرفر
        checkTimeoutInterval: 60000
    })

    // عند دخول البوت بنجاح
    bot.on('spawn', () => {
        console.log('✅ تم تسجيل الدخول! البوت الآن داخل السيرفر ويقفز لمنع الطرد.');
        
        // حركة القفز كل 30 ثانية
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true)
                setTimeout(() => bot.setControlState('jump', false), 500)
            }
        }, 30000)
    })

    // إرسال رسالة ترحيب (اختياري)
    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        if (message === '!hello') {
            bot.chat('أهلاً بك! أنا بوت الحماية.')
        }
    })

    // في حال حدوث خطأ
    bot.on('error', (err) => {
        console.log('❌ حدث خطأ: ' + err.message)
    })

    // إعادة الاتصال التلقائي في حال الطرد أو انقطاع السيرفر
    bot.on('end', () => {
        console.log('🔄 انقطع الاتصال، جاري إعادة المحاولة بعد 15 ثانية...')
        setTimeout(createBot, 15000)
    })
}

createBot()
