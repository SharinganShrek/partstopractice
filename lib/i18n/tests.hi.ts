import type { CourseTest } from '../tests';

function parseOptions(
    a: string,
    b: string,
    c: string,
    d: string
): { key: string; text: string }[] {
    return [
        { key: 'A', text: a },
        { key: 'B', text: b },
        { key: 'C', text: c },
        { key: 'D', text: d },
    ];
}

const testsHi: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "FLL में प्रतिस्पर्धा करने वाले रोबोटों को कार्य कैसे दिए जाते हैं?",
                options: parseOptions(
                    'यादृच्छिक रूप से चुने जाते हैं',
                    'सीज़न के थीम के अनुसार कार्य निर्धारित होते हैं',
                    'टीमें कार्य बनाती हैं',
                    'रेफरी मैच के दौरान निर्धारित करते हैं'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FLL टीम कैसे जीतती है?',
                options: parseOptions(
                    'सबसे बड़े रोबोट के साथ',
                    'सबसे तेज़ टीम के रूप में',
                    'रोबोट प्रदर्शन, प्रोजेक्ट और टीम वर्क के साथ',
                    'केवल रोबोट अंक के साथ'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'FLL शैक्षणिक रूप से क्या योगदान दे सकता है?',
                options: parseOptions(
                    'केवल मनोरंजन प्रदान करता है',
                    'खेल कौशल सिखाता है',
                    'STEM कौशल विकसित करता है',
                    'परीक्षा परिणाम खराब करता है'
                ),
                correctAnswer: 'C',
            },
            {
                question: "FLL में रोबोट डिज़ाइन कैसे किया जाता है?",
                options: parseOptions(
                    'तैयार खरीदा जाता है',
                    'LEGO के टुकड़ों से डिज़ाइन किया जाता है',
                    'धातु काटकर बनाया जाता है',
                    'मैच के दौरान बनाया जाता है'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FLL के चार मुख्य घटक क्या हैं?",
                options: parseOptions(
                    'कोड, गति, प्रतियोगिता, अंक',
                    'रोबोट गेम, प्रोजेक्ट, मूल्य, डिज़ाइन',
                    'केवल रोबोट प्रतियोगिता',
                    'प्रस्तुति और पुरस्कार'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FLL प्रतियोगिता का उद्देश्य क्या है?',
                options: parseOptions(
                    'रोबोटों को लड़ाना',
                    'समस्या समाधान और इंजीनियरिंग सिखाना',
                    'गति की दौड़ कराना',
                    'केवल पुरस्कार प्राप्त करना'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FLL रोबोट मैच कितने मिनट तक चलते हैं?',
                options: parseOptions('1 मिनट', '2 मिनट 30 सेकंड', '5 मिनट', '10 मिनट'),
                correctAnswer: 'B',
            },
            {
                question: "FLL में हर सीज़न का मुख्य विषय क्या कवर करता है?",
                options: parseOptions(
                    'यादृच्छिक विषय',
                    'एक वर्तमान सामाजिक समस्या',
                    'केवल रोबोट की गति',
                    'खेल का मनोरंजन'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FLL में कौन सा अधिक महत्वपूर्ण है: प्रक्रिया या परिणाम?",
                options: parseOptions(
                    'केवल परिणाम',
                    'केवल पुरस्कार',
                    'प्रक्रिया और सीखना',
                    'रोबोट का आकार'
                ),
                correctAnswer: 'C',
            },
            {
                question: "FLL छोटी उम्र में STEM विकास में क्या योगदान देता है?",
                options: parseOptions(
                    'कोई योगदान नहीं',
                    'केवल मनोरंजन प्रदान करता है',
                    'विज्ञान और इंजीनियरिंग में रुचि पैदा करता है',
                    'पढ़ाई को कठिन बनाता है'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "FTC और FLL में क्या अंतर है?",
                options: parseOptions(
                    'वही हैं',
                    'FTC अधिक बड़ा और जटिल है',
                    'FTC अधिक छोटा है',
                    'FTC में रोबोट नहीं होते'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC रोबोट क्या कर सकते हैं?',
                options: parseOptions(
                    'केवल चल सकते हैं',
                    'वस्तुएँ उठा सकते हैं और कार्य कर सकते हैं',
                    'उड़ सकते हैं',
                    'केवल घूम सकते हैं'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC में यांत्रिक दृष्टि से किस प्रकार का कार्य आवश्यक है?',
                options: parseOptions(
                    'सरल असेंबली',
                    'गंभीर यांत्रिक डिज़ाइन',
                    'केवल सॉफ़्टवेयर',
                    'कोई डिज़ाइन नहीं'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'प्रतियोगिता की तैयारी के दौरान सबसे अधिक क्या ध्यान में रखना चाहिए?',
                options: parseOptions(
                    'रोबोट का रंग',
                    'टीम की रणनीति',
                    'टीम की टी-शर्ट',
                    'केवल गति'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC के लिए कितनी व्यापक रोबोटिक्स जानकारी आवश्यक है?',
                options: parseOptions(
                    'ज़रूरत नहीं है',
                    'मध्यम स्तर की इंजीनियरिंग जानकारी',
                    'केवल खेल की जानकारी',
                    'केवल सॉफ़्टवेयर'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FTC का मुख्य उद्देश्य क्या है?",
                options: parseOptions(
                    'प्रतियोगिता जीतना',
                    'छात्रों को इंजीनियरिंग की ओर प्रेरित करना',
                    'रोबोट बेचना',
                    'केवल मनोरंजन करना'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC में कौन सी प्रोग्रामिंग भाषाएँ उपयोग की जाती हैं?',
                options: parseOptions(
                    'Java और ब्लॉक कोडिंग',
                    'केवल C++',
                    'Python अनिवार्य',
                    'कोई कोड नहीं'
                ),
                correctAnswer: 'A',
            },
            {
                question: "FTC में यांत्रिक डिज़ाइन क्यों महत्वपूर्ण है?",
                options: parseOptions(
                    'महत्वपूर्ण नहीं है',
                    'रोबोट कार्य पूरा करता है',
                    'केवल दिखावे के लिए',
                    'रेफरी मांगता है'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC रोबोट किस प्रकार की संरचना के होते हैं?',
                options: parseOptions(
                    'LEGO',
                    'धातु किट के टुकड़े',
                    'गत्ता',
                    'प्लास्टिक खिलौना'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC प्रतियोगिता की तैयारी करते समय रणनीति और इंजीनियरिंग प्रक्रिया की योजना कैसे बनानी चाहिए?',
                options: parseOptions(
                    'यादृच्छिक रूप से',
                    'योजनाबद्ध और परीक्षण करके',
                    'अंतिम दिन',
                    'केवल सॉफ़्टवेयर बनाकर'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "FIRST का पूरा नाम क्या है?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FIRST के संस्थापक का पूरा नाम क्या है?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "FIRST का मिशन क्या है?",
                options: parseOptions(
                    'रोबोट बेचना',
                    'युवाओं को STEM क्षेत्रों की ओर प्रेरित करना',
                    'प्रतियोगिता आयोजित करना',
                    'पैसा कमाना'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FIRST के मूल मूल्य क्या हैं?",
                options: parseOptions(
                    'गति और प्रतिस्पर्धा',
                    'टीम वर्क और सम्मान',
                    'जीतना',
                    'रोबोट की शक्ति'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FIRST हमसे वास्तव में क्या करने की अपेक्षा करता है?',
                options: parseOptions(
                    'केवल जीतना',
                    'सीखना और साझा करना',
                    'रोबोट बनाना',
                    'प्रतिद्वंद्वी को हराना'
                ),
                correctAnswer: 'B',
            },
            {
                question: '"Core values" की अवधारणा क्या कवर करती है?',
                options: parseOptions(
                    'रोबोट अंक',
                    'टीम के व्यवहार और सहयोग',
                    'केवल जीतना',
                    'रेफरी के नियम'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FIRST के मूल्यों को दैनिक जीवन में कैसे अपनाया जा सकता है?',
                options: parseOptions(
                    'इस्तेमाल नहीं कर सकते',
                    'सम्मान और सहयोग के साथ',
                    'केवल प्रतियोगिता में',
                    'स्कूल के बाहर आवश्यक नहीं'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'टीम वर्क में FIRST के मूल्यों का उपयोग कैसे किया जाता है?',
                options: parseOptions(
                    'बहस करके',
                    'सहयोग करके',
                    'अकेले काम करके',
                    'लीडर की बात न मानकर'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Gracious Professionalism का क्या अर्थ है?',
                options: parseOptions(
                    'कठोर प्रतिस्पर्धा',
                    'सम्मानजनक पेशेवरता',
                    'जीतने की इच्छा',
                    'चुप्पी'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Coopertition की अवधारणा क्या दर्शाती है?',
                options: parseOptions(
                    'प्रतिद्वंद्वी को हराना',
                    'प्रतिस्पर्धा करते हुए सहयोग करना',
                    'अकेले प्रतिस्पर्धा करना',
                    'प्रतियोगिता रद्द करना'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC स्वयंसेवक और पुरस्कार
        questions: [
            {
                question: 'FRC स्वयंसेवक बनने के लिए क्या करना चाहिए?',
                options: parseOptions(
                    'सदस्य बनना',
                    'स्वयंसेवक आवेदन करना',
                    'टीम बनाना',
                    'रोबोट बनाना'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FRC स्वयंसेवक कौन बन सकते हैं?',
                options: parseOptions(
                    'केवल छात्र',
                    'सभी उम्र के स्वयंसेवक',
                    'केवल शिक्षक',
                    'केवल इंजीनियर'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FRC में स्वयंसेवक क्या करते हैं?",
                options: parseOptions(
                    'रोबोट चलाते हैं',
                    'संगठन को सहयोग करते हैं',
                    'टीम बनाते हैं',
                    'प्रतियोगिता का प्रबंधन करते हैं'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'नई टीमों को अपनी रणनीतियाँ किस दिशा में विकसित करनी चाहिए?',
                options: parseOptions(
                    'सबसे कठिन रोबोट बनाना',
                    'सरल और विश्वसनीय प्रणाली बनाना',
                    'केवल गति',
                    'बड़ा रोबोट बनाना'
                ),
                correctAnswer: 'B',
            },
            {
                question: "स्वयंसेवक FIRST को फैलाने में कैसे मदद करते हैं?",
                options: parseOptions(
                    'प्रतियोगिताओं का समर्थन करके',
                    'रोबोट बनाकर',
                    'कोड लिखकर',
                    'केवल देखकर'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'FRC पुरस्कार देते समय किस बात का ध्यान रखा जाता है?',
                options: parseOptions(
                    'केवल अंकों पर',
                    'टीम वर्क और प्रभाव पर',
                    'रोबोट के रंग पर',
                    'गति पर'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FRC परिवार में स्वयंसेवकों की भूमिका क्या है?",
                options: parseOptions(
                    'केवल देखना',
                    'संगठन का समर्थन करना',
                    'रोबोट चलाना',
                    'रेफरी बनना अनिवार्य'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FRC संस्कृति को फैलाने में स्वयंसेवकों की क्या भूमिका है?',
                options: parseOptions(
                    'कोई भूमिका नहीं',
                    'प्रचार और समर्थन प्रदान करते हैं',
                    'केवल पुरस्कार देते हैं',
                    'रोबोट बनाते हैं'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Field Resetter बनने के लिए क्या करना चाहिए?',
                options: parseOptions(
                    'रोबोट बनाना',
                    'स्वयंसेवक के रूप में आवेदन करना',
                    'टीम बनाना',
                    'रेफरी बनना'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FRC में पुरस्कारों का उद्देश्य केवल सफलता को मापना है?",
                options: parseOptions(
                    'हाँ',
                    'नहीं, टीम संस्कृति को भी मापता है',
                    'केवल गति मापता है',
                    'रोबोट की शक्ति मापता है'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // कार्य वितरण
        questions: [
            {
                question: 'FRC टीम में कौन-कौन सी भूमिकाएँ होती हैं?',
                options: parseOptions(
                    'केवल ड्राइवर',
                    'मैकेनिकल, सॉफ़्टवेयर, PR आदि',
                    'केवल सॉफ़्टवेयर',
                    'रेफरी'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'कार्य वितरण का महत्व क्या है?',
                options: parseOptions(
                    'कोई महत्व नहीं',
                    'नियमित कार्य सुनिश्चित करता है',
                    'समय बर्बाद करता है',
                    'केवल लीडर काम करता है'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'टीम में भूमिका वितरण कैसे किया जाना चाहिए?',
                options: parseOptions('यादृच्छिक', 'योग्यता के अनुसार', 'उम्र के अनुसार', 'रंग के अनुसार'),
                correctAnswer: 'B',
            },
            {
                question: 'टीम की भूमिकाओं के बीच संचार कैसे किया जाना चाहिए?',
                options: parseOptions(
                    'बिना बात किए',
                    'नियमित संचार के साथ',
                    'केवल लीडर के साथ',
                    'प्रतियोगिता के दौरान बात करके'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'टीम के भीतर कार्य वितरण क्यों किया जाना चाहिए?',
                options: parseOptions(
                    'भ्रम से बचने के लिए',
                    'मनोरंजन के लिए',
                    'आवश्यक नहीं',
                    'केवल औपचारिकता के लिए'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'तकनीकी विभाग के मुख्य कार्य क्या हैं?',
                options: parseOptions(
                    'प्रचार करना',
                    'रोबोट विकसित करना',
                    'वीडियो बनाना',
                    'प्रायोजक ढूंढना'
                ),
                correctAnswer: 'B',
            },
            {
                question: "PR के मुख्य कार्य क्या हैं?",
                options: parseOptions(
                    'रोबोट बनाना',
                    'टीम का प्रचार करना',
                    'कोड लिखना',
                    'मैदान तैयार करना'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'मैकेनिकल और सॉफ़्टवेयर टीमों के बीच किस प्रकार का समन्वय आवश्यक है?',
                options: parseOptions(
                    'कोई आवश्यकता नहीं',
                    'निरंतर संचार आवश्यक है',
                    'अलग काम करते हैं',
                    'प्रतियोगिता में एकजुट होते हैं'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'नेतृत्व की कमी टीम के प्रदर्शन को कैसे प्रभावित करती है?',
                options: parseOptions(
                    'प्रभावित नहीं करती',
                    'प्रदर्शन घटाता है',
                    'प्रदर्शन बढ़ाता है',
                    'रोबोट को बड़ा करता है'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'यदि सही कार्य वितरण नहीं किया गया तो प्रतियोगिता के दिन किस प्रकार की समस्याएँ उत्पन्न हो सकती हैं?',
                options: parseOptions(
                    'कोई समस्या नहीं',
                    'भ्रम और व्यवधान उत्पन्न होता है',
                    'रोबोट तेज़ हो जाता है',
                    'अंक बढ़ जाते हैं'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // FIRST प्रतियोगिता
        questions: [
            {
                question: 'FIRST प्रतियोगिताएँ कितने मुख्य श्रेणियों में विभाजित हैं?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'FIRST के अंतर्गत कौन-कौन सी 3 प्रतियोगिताएँ आयोजित की जाती हैं?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'किसी छात्र की FIRST के साथ पहली मुलाकात किस प्रतियोगिता से होती है?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'विश्वविद्यालय लीग'),
                correctAnswer: 'C',
            },
            {
                question: 'प्रतियोगिताएँ किन आयु समूहों के लिए आयोजित की जाती हैं?',
                options: parseOptions(
                    'केवल हाई स्कूल',
                    'प्राथमिक से हाई स्कूल तक',
                    'केवल विश्वविद्यालय',
                    'केवल वयस्क'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FRC रोबोट अन्य FIRST रोबोटों से कैसे भिन्न होते हैं?',
                options: parseOptions(
                    'छोटे होते हैं',
                    'अधिक बड़े और शक्तिशाली होते हैं',
                    'LEGO के होते हैं',
                    'उड़ सकते हैं'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FRC रोबोट FTC रोबोटों से कितने गुना बड़े होते हैं?',
                options: parseOptions('वही', 'लगभग 2 गुना', '10 गुना', 'अधिक छोटे'),
                correctAnswer: 'B',
            },
            {
                question: 'सबसे छोटे रोबोट का उपयोग किस प्रतियोगिता में होता है?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'कोई नहीं'),
                correctAnswer: 'C',
            },
            {
                question: 'सबसे बड़े और औद्योगिक रोबोट का उपयोग किस प्रतियोगिता में होता है?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'सभी समान'),
                correctAnswer: 'C',
            },
            {
                question: 'प्रतियोगिताओं में अंक कैसे दिए जाते हैं?',
                options: parseOptions(
                    'यादृच्छिक',
                    'कार्य की सफलता के अनुसार',
                    'रोबोट के आकार के अनुसार',
                    'रेफरी चुनता है'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'प्रतियोगिता के दौरान उत्पन्न यांत्रिक समस्याओं का समाधान कैसे किया जाता है?',
                options: parseOptions(
                    'प्रतियोगिता से हटकर',
                    'पिट टीम द्वारा त्वरित मरम्मत करके',
                    'इंतजार करके',
                    'मैच रद्द करके'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsHi;
