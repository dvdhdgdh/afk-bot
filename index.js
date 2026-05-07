const mineflayer = require('mineflayer');

// دالة لإنشاء البوت والتعامل مع الاتصال
function createBot() {
    const bot = mineflayer.createBot({
        host: 'yourcity1.aternos.me', // تأكد أن هذا هو عنوان سيرفرك الفعلي
        port: 25565,                  // المنفذ الافتراضي بما أنه لا يوجد بورت مخصص
        username: 'AFK_Worker',       // اسم البوت داخل اللعبة
        version: '1.21.4',            // الإصدار الموضح في صورتك
    });

    // عند دخول البوت بنجاح
    bot.on('spawn', () => {
        console.log('✅ تم تسجيل الدخول! البوت الآن داخل السيرفر ويقفز لمنع الطرد.');
        
        // حركة القفز كل 30 ثانية لمنع الـ AFK kick
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // في حال حدوث خطأ في الاتصال
    bot.on('error', (err) => {
        console.log('❌ حدث خطأ: ' + err.message);
    });

    // في حال تم طرد البوت أو انقطع الاتصال، يحاول العودة بعد 15 ثانية
    bot.on('end', () => {
        console.log('🔄 انقطع الاتصال، جاري إعادة المحاولة بعد 15 ثانية...');
        setTimeout(createBot, 15000);
    });
}

// تشغيل البوت لأول مرة
createBot();
