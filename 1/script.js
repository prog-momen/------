let gender = null;
let activityLevel = null;

function selectGender(selectedGender) {
    gender = selectedGender;
    document.querySelector(".step1").classList.remove("active");
    document.querySelector(".step2").classList.add("active");
}

function selectActivity(selectedActivity) {
    activityLevel = selectedActivity;
    document.querySelector(".step2").classList.remove("active");
    document.querySelector(".step3").classList.add("active");
}
function calculateBMI() {
    const age = parseFloat(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    if (!age || !weight || !height) {
        alert("الرجاء إدخال جميع البيانات بشكل صحيح!");
        return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    const bmr = gender === 'male'
        ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
        : Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    const maintenanceCalories = Math.round(bmr * (1 + activityLevel));
    const waterIntake = (weight * 0.03).toFixed(1);

    let bmiStatus = '';
    let tips = [];

    if (bmi < 18.5) {
        bmiStatus = "نقص الوزن";
        tips = [
            "زيادة السعرات الحرارية اليومية بشكل معتدل.",
            "الاهتمام بتناول الأطعمة الغنية بالبروتين والكربوهيدرات.",
            "التركيز على تمارين تقوية العضلات."
        ];
    } else if (bmi < 24.9) {
        bmiStatus = "طبيعي";
        tips = [
            "الاستمرار في ممارسة النشاط البدني بانتظام.",
            "الحفاظ على نظام غذائي متوازن.",
            "شرب كمية كافية من الماء يومياً."
        ];
    } else if (bmi < 29.9) {
        bmiStatus = "زيادة الوزن";
        tips = [
            "تقليل السعرات الحرارية الزائدة عن الحاجة.",
            "زيادة النشاط البدني بشكل يومي.",
            "التركيز على تناول الخضروات والبروتينات."
        ];
    } else {
        bmiStatus = "سمنة";
        tips = [
            "استشارة أخصائي تغذية لوضع خطة غذائية.",
            "زيادة النشاط البدني تدريجياً.",
            "تقليل تناول السكريات والدهون."
        ];
    }

    // Update the result cards
    document.getElementById("bmi").textContent = bmi;
    document.getElementById("bmi-status").textContent = bmiStatus;
    document.getElementById("bmr").textContent = bmr;
    document.getElementById("maintenance-calories").textContent = maintenanceCalories;
    document.getElementById("total-energy").textContent = maintenanceCalories;
    document.getElementById("water-intake").textContent = `${waterIntake} لتر`;

    // Update the tips section
    const tipsList = document.getElementById("tips-list");
    tipsList.innerHTML = '';
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });

    // Show the result section
    document.querySelector(".step3").classList.remove("active");
    document.querySelector(".step4").classList.add("active");
}

function resetCalculator() {
    // Reset global variables
    gender = null;
    activityLevel = null;

    // Clear all inputs
    document.getElementById("age").value = '';
    document.getElementById("weight").value = '';
    document.getElementById("height").value = '';

    // Reset the result text
    document.getElementById("result").innerText = '';

    // Hide all steps and show the first step
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelector('.step1').classList.add('active');
}


// Initialize first step
document.querySelector(".step1").classList.add("active");
