
import { ActionArea, AppData } from '../types';

// --- RAW DATA FROM JSON ---

// 1. DIRECTION (User Selection)
const RAW_DIRECTION = {
    results: [
        {
            objectId: "rywJ05nGYJ",
            energies: [
                "מנצח", "אנרגטי", "שלו", "ממוקד" // Default fallback if empty
            ],
            blockers: [
                "אחווה תחושה שאין לי מה לתת",
                "לא יהיה אתגר שהזיז אותי"
            ],
            releasers: [
                "אקח מס' נשימות עמוקות",
                "לא אקח דברים באופן אישי"
            ],
            user: { __type: "Pointer", className: "_User", objectId: "JMRi6OU42a" },
            area: { __type: "Pointer", className: "Area", objectId: "3CMqQhBnIQ" },
            ready: true,
            reqTarget: "סיום פיתוח האפליקציה בגרסת VIP" // Mocking this as it was null in provided json
        }
    ]
};

// 2. ACTION AREAS (Tasks)
const RAW_ACTION_AREAS = [
    {
        objectId: "uScKLQIIga",
        baseAction: {
            objectId: "pRsbojwalh",
            name: "דק' זמן הקשבה נוכחת לבעלי",
            questions: ["כמה דק' את רואה שתקדישי היום להקשבה נוכחת לבעלך?", "", "כמה דק' זמן הקדשת היום להקשבה נוכחת לבעלך?", ""],
            order: 2, isTarget: true, sliderMin: 0, sliderMax: 10, sliderStep: 1
        }
    },
    {
        objectId: "BGVC8oyJAs",
        baseAction: {
            objectId: "khnYlO5xpF",
            name: "דק' זמן Well-being",
            questions: ["כמה דק' את/ה רואה שתקדיש/י היום לתרגול ה-Wellbeing שלך?", "איזה סוג של Wellbeing את/ה רואה שתעשה/י היום?", "כמה דקות הקדשת היום לתרגול ה-Wellbeing שלך?", "איזה סוג של Well-being עשית היום?"],
            itemsEx: [
                { name: "תפילה", disabled: false }, { name: "הליכה", disabled: false }, { name: "חדר כושר", disabled: false }, 
                { name: "מדיטציה", disabled: false }, { name: "יוגה", disabled: false }, { name: "ריצה", disabled: false }
            ],
            order: 9, isTarget: false, sliderMin: 0, sliderMax: 100, sliderStep: 5
        }
    },
    {
        objectId: "op1piDmSXF",
        baseAction: {
            objectId: "MDZOwI2XcU",
            name: "פעמים התעניינות בשלומו של בעלי",
            questions: ["כמה פעמים את רואה שתתענייני היום בשלומו של בעלך?", "", "כמה פעמים התעניינת היום בשלומו של בעלך?", ""],
            order: 0, isTarget: true, sliderMin: 0, sliderMax: 10, sliderStep: 1
        }
    },
    {
        objectId: "4VPk3rB0OU",
        baseAction: {
            objectId: "LNrM7krEM6",
            name: "דק' תכנון יומי",
            questions: ["כמה דק' את/ה רואה שתקדיש/י היום למכירות בעסק?", "", "כמה שיחות מכירה עשית היום?", ""],
            order: 10, isTarget: false, sliderMin: 0, sliderMax: 60, sliderStep: 5
        }
    },
    {
        objectId: "0TYtkLtFkC",
        baseAction: {
            objectId: "8KuF1Wgifg",
            name: "דק' מדיטציה לפני הכניסה הביתה",
            questions: ["", "", "", ""],
            order: 8, isTarget: false, sliderMin: 0, sliderMax: 12, sliderStep: 1
        }
    },
    {
        objectId: "9eMlLW3b32",
        baseAction: {
            objectId: "gfUT3UT7bR",
            name: "דק' זמן הקשבה נוכחת לאשתי",
            questions: ["כמה דק' אתה רואה שתקדיש להקשבה נוכחת לאשת?", "", "כמה דק' הקדשת היום להקשבה נוכחת לאשתך?", ""],
            order: 3, isTarget: true, sliderMin: 0, sliderMax: 10, sliderStep: 1
        }
    }
];

// 3. AREA (Methodology Pools)
const RAW_AREA_DATA = {
    challenges: [
        "אחווה תחושה שאין לי מה לתת", "לא יהיה אתגר שהזיז אותי", "אחווה שאני לא מספיק טוב/ה", 
        "אחווה חוסר מסוגלות", "אחווה חוסר החלטיות", "אחווה קושי שהכל גדול עלי", "אחווה חוסר ביטחון",
        "אחווה ראייה לטווח קצר", "אחשוש ממה אחרים יגידו", "אחווה סביבה רעילה", "אחווה איבוד שליטה",
        "אחווה חוסר הכרת הטוב", "אחווה חוסר מיקוד", "אפעל מתוך לחץ והישרדות", "אפעל בדרך שלא נכונה לי",
        "אחווה בריחה למדיה חברתית", "אחווה תקיעות", "אחווה חוסר עניין", "אחווה תסכול", "אחווה דחיינות",
        "אחווה שיפוטיות", "אחווה דאגה כלכלית", "לקוחות לא יראו את הערך"
    ],
    assists: [
        "אקח מס' נשימות עמוקות", "לא אקח דברים באופן אישי", "אתמקד בכוונות שלי", "אבחר להיות בחמלה לסיטואציה",
        "אתקשר את מה ששמעתי", "אבחר להתבונן בתחושות", "אזכיר לעצמי שאני שלם", "״כשאני שלם עם הדרך לי אני מנצח״",
        "אזכיר לעצמי את אמונת הניצחון שלי", "אזכיר לעצמי את המטרה הגדולה", "אבחר להיות שלם עם הדרך שלי",
        "אבחר לחיות כאדם ראוי", "הייתי אלוף גם לפני זה!", "אתחבר לאדם הקליל והמשוחרר שאני",
        "אזכיר לעצמי את הערך שלי", "כגודל השחרור - גודל הביצועים", "פתיחות = קלילות",
        "אבחר לחייך ולהתבונן על הסיטואציה", "הביקורת החשובה היא שלי לעצמי", "אומץ זה להיות מוכן להיות פגיע",
        "להרפות ולהיות משוחרר וקליל", "LESS IS MORE", "ארפה לתוך התחושה", "אעשה פעולה שנעימה לי באותו זמן"
    ],
    intents: [
        "אדיב", "אוהב", "אותנטי", "אכפתי", "אמיץ", "אמיתי", "אנרגטי", "אסרטיבי", "אקטיבי", 
        "בטוח", "בעל אמונה", "בעל הומור", "בעל חמלה", "בעל נתינה", "בעל תשוקה", "בתמורה", "גמיש",
        "זורם", "חופשי", "חי", "חיובי", "חיוני", "יצירתי", "כנה", "כריזמטי", "מאוזן", "מאושר",
        "מאמין", "מאפשר", "מוביל", "מחויב", "מחייך", "מכבד", "מכיל", "ממוקד", "מנהיג", "מסופק",
        "מעורר השראה", "מעצים", "מפוקס", "מפנים", "מקבל", "משוחרר", "מתבונן", "מתחשב", "מתמסר",
        "מתעניין", "נאמן לעצמי", "נדיב", "נהנה", "נוכח", "נחוש", "נינוח", "נמרץ", "סבלני", "סוחף",
        "סומך", "סקרן", "עוצמתי", "עושה", "עניו", "עקבי", "ער", "פתוח", "קליל", "קשוב", "רגוע",
        "רגיש", "רואה", "שאפתן", "שייך", "שלוו", "שלם", "שמח", "שקט"
    ]
};


export const getActionAreas = async (): Promise<ActionArea[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        // Map raw action areas to app type
        const mapped = RAW_ACTION_AREAS.map(item => ({
            objectId: item.objectId,
            name: item.baseAction.name,
            order: item.baseAction.order,
            isTarget: item.baseAction.isTarget,
            sliderMin: item.baseAction.sliderMin,
            sliderMax: item.baseAction.sliderMax,
            sliderStep: item.baseAction.sliderStep,
            questions: item.baseAction.questions,
            itemsEx: item.baseAction.itemsEx,
        })).sort((a, b) => a.order - b.order);
      resolve(mapped);
    }, 500); 
  });
};

export const getAppData = async (): Promise<AppData> => {
   return new Promise((resolve) => {
    setTimeout(() => {
      // Construct AppData from the RAW parts
      const direction = RAW_DIRECTION.results[0];
      
      const fullData: AppData = {
          identities: direction.energies || [],
          actionAreas: RAW_ACTION_AREAS.map(item => ({
            objectId: item.objectId,
            name: item.baseAction.name,
            order: item.baseAction.order,
            isTarget: item.baseAction.isTarget,
            sliderMin: item.baseAction.sliderMin,
            sliderMax: item.baseAction.sliderMax,
            sliderStep: item.baseAction.sliderStep,
            questions: item.baseAction.questions,
            itemsEx: item.baseAction.itemsEx,
          })).sort((a, b) => a.order - b.order),
          
          challenges: (direction.blockers || []).map((t, i) => ({ id: i.toString(), text: t })),
          recoveryStrategies: (direction.releasers || []).map((t, i) => ({ id: i.toString(), text: t })),
          
          keyAchievement: {
            title: (direction.reqTarget as string) || "הגדרת הישג מפתח",
            targetDate: "2026-03-01",
            description: "הישג זה מבוסס על בחירת הכיוון שלך לתקופה זו."
          },
          keyTask: {
            title: "ביצוע שיחת המכירה החשובה",
            isCompleted: false
          },
          processSummary: "",
          
          // New Fields
          dailyWriting: "",
          personalRequest: "",
          nextPracticeTime: "20:00",

          // Pools
          poolIdentities: RAW_AREA_DATA.intents,
          poolChallenges: RAW_AREA_DATA.challenges,
          poolRecoveryStrategies: RAW_AREA_DATA.assists,

          // Dashboard Mock Data
          dashboardStats: {
              dailyHistory: Array.from({ length: 14 }).map((_, i) => ({
                  date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit' }),
                  score: Math.floor(Math.random() * (100 - 65) + 65), // Random score between 65 and 100
                  tasksCompleted: Math.floor(Math.random() * 8)
              })),
              identityUsage: [
                  { name: 'מנצח', count: 12, color: '#D4AF37' },
                  { name: 'אנרגטי', count: 8, color: '#A0AEC0' },
                  { name: 'שלו', count: 6, color: '#718096' },
                  { name: 'ממוקד', count: 4, color: '#CBD5E0' }
              ],
              categoryPerformance: [
                  { name: 'זוגיות', value: 85 },
                  { name: 'עסקים', value: 65 },
                  { name: 'Wellbeing', value: 92 },
                  { name: 'תכנון', value: 78 }
              ],
              recentLogs: [
                  { id: '1', date: '05/10/22', time: '20:20', action: 'הישגים בחיים', category: 'יומן התבוננות', score: 'בוצע' },
                  { id: '2', date: '05/10/22', time: '20:01', action: 'תת תחום חדש', category: 'ניהול', score: '75%' },
                  { id: '3', date: '05/10/22', time: '19:45', action: 'בוסט בוקר', category: 'אנרגיה', score: '100%' },
                  { id: '4', date: '04/10/22', time: '08:30', action: 'מדיטציה', category: 'Wellbeing', score: '100%' },
                  { id: '5', date: '04/10/22', time: '09:15', action: 'שיחת מכירה', category: 'עסקים', score: '60%' },
              ]
          }
      };

      resolve(fullData);
    }, 500);
   });
};
