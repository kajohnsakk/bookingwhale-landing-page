export const businessUseCases = {
  'food-beverage': {
    th: {
      heading: 'มื้อเย็น คาเฟ่ หรือมื้อพิเศษ', intro: 'แต่ละร้านรับลูกค้าต่างกัน เลือกตัวอย่างที่ใกล้กับร้านคุณ แล้วดูว่าจะเปิดรับจองอย่างไร',
      cases: [
        {title:'ร้านอาหารมื้อเย็น', context:'กำลังจัดร้านสำหรับมื้อเย็น ลูกค้าก็ทักมาถามว่าเวลาไหนยังจองได้', setup:'เปิดรอบ 18:00 และ 19:30 ให้ลูกค้าเลือกเวลาและจำนวนคนผ่านหน้าจอง', outcome:'ก่อนเปิดมื้อ รู้ว่าลูกค้าจะมากี่คนและเวลาไหน จึงเตรียมที่นั่งได้ตรงรอบ'},
        {title:'คาเฟ่และ walk-in', context:'บางคนอยากนัดเพื่อนล่วงหน้า บางคนแวะเข้าร้านระหว่างวัน', setup:'ร้านมี 20 ที่นั่ง เปิดจอง 8 ที่ต่อรอบ แล้วเผื่อพื้นที่ที่เหลือสำหรับ walk-in', outcome:'ลูกค้านัดล่วงหน้าได้ และร้านยังมีพื้นที่ตามแผนสำหรับคนที่แวะมา'},
        {title:'ร้านที่เสิร์ฟเป็นรอบ', context:'มื้อพิเศษเริ่มพร้อมกันทั้งร้าน ครัวจึงต้องรู้จำนวนก่อนเตรียมวัตถุดิบ', setup:'เปิดมื้อ 19:00 รับ 12 คน แล้วตรวจจำนวนผู้จองก่อนเริ่มเตรียม', outcome:'ใช้ยอดจองประกอบการเตรียมวัตถุดิบและทีมบริการ'},
      ],
      dayTitle:'ก่อนเปิดมื้อเย็น ร้านเห็นอะไรบ้าง?', dayIntro:'ตัวอย่างการเตรียมบริการจากรายการจอง โดยร้านยังเป็นผู้จัดที่นั่งและกำลังทีมตามหน้างาน',
      day:[['ก่อนเปิดรับจอง','เลือกรอบและจำนวนคน','แบ่งจำนวนสำหรับจองล่วงหน้าและ walk-in ให้ชัด'],['ก่อนเริ่มมื้อ','ตรวจรายการของวันนี้','ดูเวลา จำนวนคน และสถานะการจอง'],['เมื่อลูกค้ามาถึง','เปิดรายการประกอบการต้อนรับ','ใช้รายละเอียดการจองเพื่อจัดบริการตามที่ร้านเตรียมไว้']],
    },
    en: {
      heading:'Dinner, coffee or a special sitting', intro:'Every restaurant serves differently. Choose an example close to yours and see how bookings could fit.',
      cases:[
        {title:'Dinner reservations',context:'Your team is setting up for dinner when guests message to ask which times they can book.',setup:'Offer 18:00 and 19:30. Guests choose their time and party size on the booking page.',outcome:'See how many guests are booked and when they arrive, then prepare seating for each sitting.'},
        {title:'Cafés & walk-ins',context:'Some guests plan coffee with friends; others drop in during the day.',setup:'A 20-seat café could offer eight places per round and keep the rest for walk-ins.',outcome:'Guests can plan ahead while you keep the space you chose for people dropping in.'},
        {title:'Dining in scheduled rounds',context:'A special menu starts at one sitting, so the kitchen needs a guest count before preparing.',setup:'Open a 19:00 service for 12 guests and check the booking count before preparation.',outcome:'Use the booked guest count to plan ingredients and service staff.'},
      ],
      dayTitle:'What can you check before dinner?',dayIntro:'An example preparation workflow. Your team still manages seating and staffing on the day.',
      day:[['Before opening slots','Choose times and capacity','Allocate space for reservations and walk-ins.'],['Before service','Review today’s reservations','Check times, party sizes and booking status.'],['When guests arrive','Refer to their reservation','Use the booking details to support your service.']],
    },
  },
  'fitness-sports': {
    th: {
      heading:'คลาสกลุ่ม ฝึกกีฬา หรือเทรนตัวต่อตัว',intro:'เลือกรูปแบบที่ใกล้กับธุรกิจคุณ แล้ววางรอบตามพื้นที่ อุปกรณ์ และเวลาที่ผู้สอนพร้อม',
      cases:[
        {title:'คลาสฟิตเนสกลุ่ม',context:'เปิดคลาสหลายรอบต่อวัน ต้องรู้ว่ารอบไหนมีผู้จองกี่คนก่อนเตรียมพื้นที่',setup:'เปิดรอบ 17:00, 18:00 และ 19:00 ครั้งละ 60 นาที รับ 10 คนตามพื้นที่ที่พร้อม',outcome:'ดูจำนวนและรายชื่อผู้จอง เพื่อจัดพื้นที่และอุปกรณ์ก่อนเริ่มคลาส'},
        {title:'ฝึกกีฬากับโค้ช',context:'สอนมวย เทนนิส หรือแบดมินตัน วางรอบฝึกตามเวลาของโค้ชและพื้นที่ที่พร้อม',setup:'ตัวอย่างคลาสมวยกลุ่มเล็ก รอบ 09:00 และ 10:30 ครั้งละ 60 นาที รับ 6 คนต่อรอบ',outcome:'รู้ว่าแต่ละรอบมีใครจองไว้ เพื่อเตรียมอุปกรณ์และวางกิจกรรมฝึก'},
        {title:'ฝึกกับเทรนเนอร์ส่วนตัว',context:'รับฝึกครั้งละหนึ่งคน และต้องมีเวลาเตรียมแต่ละเซสชัน',setup:'เปิดรอบ 14:00 และ 16:00 ครั้งละ 60 นาที รับ 1 คนต่อรอบ',outcome:'เทรนเนอร์เห็นเวลานัดล่วงหน้า เพื่อเตรียมแต่ละเซสชัน'},
      ],
      dayTitle:'ก่อนเริ่มคลาส ไม่ต้องไล่หาชื่อในแชท',dayIntro:'ให้รายการจองเป็นจุดเริ่มต้นในการเตรียมคลาส วางรอบตามเวลาที่ครูและอุปกรณ์พร้อมใช้งาน',
      day:[['วางตาราง','เปิดรอบที่ครูและอุปกรณ์พร้อม','ระบุคลาส เวลา และจำนวนผู้เรียนที่รับได้'],['เปิดรับจอง','ส่งลิงก์ผ่าน LINE OA','ผู้เรียนเลือกวันและรอบที่สะดวก'],['ก่อนเริ่มสอน','ตรวจรายชื่อและสถานะการจอง','เตรียมอุปกรณ์และพื้นที่ตามจำนวนผู้จอง']],
    },
    en: {
      heading:'Group classes, sports coaching or one-to-one training',intro:'Choose a setup that fits your business, then plan sessions around your space, equipment and instructors’ availability.',
      cases:[
        {title:'Group fitness classes',context:'With several classes a day, you need to know how many people are booked before preparing the space.',setup:'Offer 60-minute sessions at 17:00, 18:00 and 19:00 for ten people, based on available space.',outcome:'Check names and numbers to arrange the space and equipment before class.'},
        {title:'Sports coaching',context:'For boxing, tennis or badminton, plan training times around your coach and available space.',setup:'Example: small-group boxing at 09:00 and 10:30, with six places per 60-minute session.',outcome:'See who is booked for each session to prepare equipment and plan training activities.'},
        {title:'Personal training',context:'You train one person at a time and need to prepare for each session.',setup:'Offer 60-minute sessions at 14:00 and 16:00, for one person per session.',outcome:'Trainers can see appointments ahead and prepare for each session.'},
      ],
      dayTitle:'Prepare for class without searching chat threads',dayIntro:'Prepare from your booking list, with sessions planned around available instructors and equipment.',
      day:[['Plan','Open sessions you can teach','Define the class, time and participant capacity.'],['Invite bookings','Share the link through LINE OA','Learners choose a date and session.'],['Before teaching','Review names and booking status','Prepare equipment and space for the people booked.']],
    },
  },
  services: {
    th: {
      heading:'นัดให้พอดี กับบริการที่คุณทำ',intro:'แต่ละบริการใช้เวลาเตรียมต่างกัน เลือกตัวอย่างที่ใกล้กับงานของคุณ แล้วลองวางรอบที่พร้อมรับ',
      cases:[
        {title:'ร้านนวดและสปา',context:'นวดจบแล้ว ยังต้องเปลี่ยนผ้าและเตรียมห้องให้ลูกค้าคนถัดไป',setup:'นวด 60 นาที เผื่อเตรียมห้องอีก 15 นาที แล้วค่อยเปิดรอบถัดไป',outcome:'วางช่วงเตรียมห้องไว้ในตาราง เพื่อพร้อมดูแลนัดถัดไป'},
        {title:'ร้านดูแลผิว',context:'ทรีตเมนต์แต่ละแบบใช้อุปกรณ์ต่างกัน ต้องรู้บริการก่อนจัดห้อง',setup:'แยกชื่อทรีตเมนต์และระยะเวลา แล้วเปิดรอบตามห้องและทีมที่พร้อม',outcome:'ตรวจบริการที่จองไว้ เพื่อเตรียมอุปกรณ์ก่อนลูกค้ามา'},
        {title:'งานปรึกษาแบบนัดหมาย',context:'มีทั้งงานเตรียมและเวลาคุยกับลูกค้า จึงเปิดรับนัดเฉพาะบางช่วง',setup:'เปิดนัด 13:00 และ 15:00 ครั้งละ 60 นาที รับ 1 คนต่อรอบ',outcome:'ดูนัดหมายก่อนเริ่มวัน แล้วเตรียมงานให้แต่ละนัด'},
      ],
      dayTitle:'เริ่มวันด้วยนัดหมายที่เห็นชัด',dayIntro:'ตัวอย่างการใช้รายการจองประกอบการเตรียมบริการ ไม่ต้องคอยย้อนอ่านข้อความเพื่อหาเวลานัด',
      day:[['ก่อนเปิดรอบ','กำหนดบริการและระยะเวลา','เผื่อเวลาเตรียมห้องและอุปกรณ์ในตาราง'],['เมื่อลูกค้าจอง','ดูวัน เวลา และสถานะ','ตรวจนัดหมายจากหน้าจัดการของร้าน'],['ก่อนให้บริการ','ทบทวนรายการและประวัติการจอง','ใช้ข้อมูลที่ผ่านมาเมื่อต้องตรวจสอบรายละเอียด']],
    },
    en: {
      heading:'Appointments that fit the work you do',intro:'Every service needs a different kind of preparation. Choose an example close to your work and plan the times you can offer.',
      cases:[
        {title:'Massage & spa',context:'When a massage ends, there are still towels to change and a room to prepare.',setup:'Plan a 60-minute massage and 15 minutes of room preparation before the next slot.',outcome:'Leave a planned gap to prepare the room for your next customer.'},
        {title:'Skincare appointments',context:'Different treatments need different equipment. Knowing the service helps your team set up.',setup:'List each treatment and its duration, then offer slots around available rooms and staff.',outcome:'Check the booked treatment to prepare equipment before arrival.'},
        {title:'One-to-one consultations',context:'You need time for both preparation and the conversation, so appointments are available at selected hours.',setup:'Offer 60-minute appointments at 13:00 and 15:00, for one person each.',outcome:'Review the day’s appointments and prepare for each customer.'},
      ],
      dayTitle:'Start the day with a clear appointment list',dayIntro:'Use booking details to prepare for service, with less need to search messages for appointment times.',
      day:[['Plan','Define services and durations','Allow preparation time in your schedule.'],['When someone books','Review dates, times and status','Keep the day’s appointment details together.'],['Before service','Refer to bookings and history','Check earlier reservation details when needed.']],
    },
  },
};
