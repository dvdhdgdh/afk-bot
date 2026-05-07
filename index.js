const mineflayer = require('mineflayer');

// دالة لإنشاء البوت والتعامل مع الاتصال
function createBot() {
    const bot = mineflayer.createBot({
        host: 'yourcity1.aternos.me', // عنوان سيرفرك من أترنوس
        port: 25565,                  // المنفذ الافتراضي للجافا (بما أن واجهتك لا تظهر بورت مخصص)
        username: 'AFK_Worker',       // اسم البوت الذي سيظهر في اللعبة
        version: '1.21.4',            // الإصدار الموضح في إعدادات سيرفرك
    });

    // عند دخول البوت بنجاح للسيرفر
    bot.on('spawn', () => {
        console.log('✅ تم تسجيل الدخول بنجاح! البوت الآن داخل السيرفر ويقفز لمنع الطرد.');
        
        // حركة القفز كل 30 ثانية لتجنب الطرد بسبب الخمول (AFK)
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // الرد التلقائي على الرسائل (اختياري)
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === '!hello') {
            bot.chat('أهلاً بك! أنا بوت الحماية الخاص بـ Bila.');
        }
    });

    // في حال حدوث خطأ أثناء محاولة الاتصال
    bot.on('error', (err) => {
        console.log('❌ حدث خطأ في الاتصال: ' + err.message);
    });

    // في حال انقطع الاتصال، يحاول البوت العودة تلقائياً بعد 15 ثانية
    bot.on('end', () => {
        console.log('🔄 انقطع الاتصال.. جاري إعادة المحاولة بعد 15 ثانية...');
        setTimeout(createBot, 15000);
    });
}

// البدء بتشغيل البوت
createBot();
