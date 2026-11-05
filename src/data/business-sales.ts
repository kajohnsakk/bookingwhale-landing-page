export type SalesCopy = {
  valueTitle: string;
  values: [string, string][];
  launchTitle: string;
  launch: [string, string][];
  faqs: [string, string][];
};

export const businessSales: Record<'food-beverage' | 'fitness-sports' | 'services', Record<'th' | 'en', SalesCopy>> = {
  'food-beverage': {
    th: {
      valueTitle: 'ช่วงเตรียมร้าน ให้รายการจองช่วยคุณ',
      values: [
        ['ลูกค้าเลือกมื้อที่สะดวก', 'ส่งลิงก์จาก LINE OA ให้ลูกค้าเลือกวัน เวลา และจำนวนคน โดยไม่ต้องถามข้อมูลทีละข้อความ'],
        ['เหลือที่ให้ลูกค้าหน้าร้าน', 'คุณเลือกจำนวนที่เปิดรับจองแต่ละรอบ และวางแผนเผื่อที่นั่งสำหรับ walk-in'],
        ['รู้ยอดจองก่อนเริ่มมื้อ', 'ดูเวลา จำนวนคน และสถานะในรายการเดียว เพื่อเตรียมที่นั่งและคุยแผนกับทีม']
      ],
      launchTitle: 'เตรียม 3 อย่าง แล้วเริ่มรับจอง',
      launch: [
        ['LINE OA ของร้าน', 'ใช้เป็นช่องทางให้ลูกค้าเปิดหน้าจอง'],
        ['เวลาและจำนวนที่รับ', 'เลือกรอบที่ทีมพร้อม และเผื่อที่สำหรับ walk-in'],
        ['กติกาการจอง', 'แจ้งวิธีเปลี่ยนเวลาและเงื่อนไขของร้านให้ชัดเจน']
      ],
      faqs: [
        ['ใช้ LINE OA เดิมได้ไหม?', 'ได้ ใช้ LINE OA ของร้านพาลูกค้าไปหน้าจอง เราช่วยดูวิธีวางลิงก์ให้เหมาะกับช่องทางที่ร้านใช้อยู่'],
        ['ยังรับลูกค้า walk-in ได้ไหม?', 'ได้ โดยร้านวางแผนแบ่งจำนวนที่เปิดรับจองกับที่นั่งสำหรับ walk-in ให้เหมาะกับพื้นที่และกำลังทีม'],
        ['ก่อนเปิดร้าน ดูข้อมูลอะไรได้บ้าง?', 'ดูวัน เวลา จำนวนคน และสถานะของแต่ละรายการจอง แล้วใช้ข้อมูลเตรียมที่นั่งและทีมก่อนเริ่มมื้อ'],
        ['ถ้าลูกค้าขอเปลี่ยนหรือยกเลิกการจอง?', 'ให้ลูกค้าติดต่อร้านตามช่องทางที่กำหนด ก่อนเปิดใช้ เราจะพาดูวิธีจัดการรายการให้เข้ากับกติกาของร้าน'],
        ['ราคาเท่าไร และทดลองใช้ได้ไหม?', 'ส่งเวลาเปิดร้านและจำนวนที่ต้องการรับจอง เพื่อขอราคาและเงื่อนไขทดลองใช้ พร้อมดูระบบก่อนตัดสินใจ']
      ]
    },
    en: {
      valueTitle: 'Prepare for service with the bookings in view',
      values: [
        ['Let guests choose their sitting', 'Share the link from LINE OA so guests can select their date, time and party size together.'],
        ['Leave room for walk-ins', 'Choose how many places to offer for each sitting and plan the seats you keep for walk-ins.'],
        ['Know the count before service', 'See arrival times, party sizes and statuses together to prepare seating and brief your team.']
      ],
      launchTitle: 'Three things to prepare',
      launch: [
        ['Your restaurant’s LINE OA', 'Where guests will find the booking link.'],
        ['Times and capacity', 'Choose slots your team can serve, with room for walk-ins.'],
        ['Your booking rules', 'Explain how to request changes and any restaurant conditions.']
      ],
      faqs: [
        ['Can we use our existing LINE OA?', 'Yes. Link your booking page from your restaurant’s LINE OA. We can review where to place the link before you start.'],
        ['Can we still accept walk-ins?', 'Yes. Plan how much capacity to offer for advance bookings and how much to keep for walk-ins, based on your space and team.'],
        ['What can we check before service?', 'Review the date, time, party size and status of each reservation, then use the list to prepare seating and your team.'],
        ['What if a guest changes or cancels a reservation?', 'Give guests a clear way to contact your restaurant. Before launch, we’ll walk through managing bookings around your restaurant’s rules.'],
        ['How much does it cost? Is there a trial?', 'Share your opening times and booking capacity to request pricing and available trial terms. You can see the system before deciding.']
      ]
    }
  },
  'fitness-sports': {
    th: {
      valueTitle: 'ก่อนเริ่มสอน มีรายชื่อพร้อมให้ดู',
      values: [
        ['ให้ผู้เรียนเลือกรอบเอง', 'เชื่อมลิงก์จาก LINE OA ให้เลือกคลาส วัน และเวลา โดยไม่ต้องถามตารางทีละรอบ'],
        ['รับคนพอดีกับพื้นที่', 'คลาสกลุ่มหรือฝึกตัวต่อตัว กำหนดจำนวนให้เหมาะกับพื้นที่ อุปกรณ์ และการดูแลของผู้สอน'],
        ['เตรียมคลาสจากรายชื่อ', 'ตรวจผู้จองและสถานะก่อนเริ่มรอบ แล้วจัดอุปกรณ์และพื้นที่ให้พร้อม']
      ],
      launchTitle: 'เริ่มจากตารางคลาสของคุณ',
      launch: [
        ['เลือกคลาสที่จะเปิดจอง', 'เตรียมชื่อคลาส เวลา และจำนวนผู้เรียนต่อรอบ'],
        ['ลองจองให้เห็นภาพ', 'เลือกหนึ่งคลาส แล้วดูทั้งหน้าลูกค้าและหน้าจัดการรายการ'],
        ['แชร์ผ่าน LINE OA', 'ให้ลูกค้าเลือกรอบ และตรวจรายชื่อก่อนเริ่มสอน']
      ],
      faqs: [
        ['ใช้ LINE OA เดิมได้ไหม?', 'ได้ ใช้ LINE OA เดิมพาลูกค้าไปหน้าจอง ให้ลูกค้าเลือกรอบจากคลาสที่คุณเปิดรับ'],
        ['คลาสกลุ่มกับคลาสส่วนตัวใช้ด้วยกันได้ไหม?', 'วางรอบตามประเภทคลาสและจำนวนผู้เรียนได้ หากใช้โค้ช พื้นที่ หรืออุปกรณ์ร่วมกัน ให้ส่งตารางตัวอย่างเพื่อตรวจสอบก่อนเริ่ม'],
        ['กำหนดจำนวนผู้เรียนต่อรอบอย่างไร?', 'ตั้งจำนวนตามพื้นที่ อุปกรณ์ และผู้สอนที่พร้อม เช่น คลาสฟิตเนส 10 คน ฝึกมวยกลุ่มเล็ก 6 คน หรือเทรนส่วนตัวครั้งละ 1 คน'],
        ['ผู้เรียนขอเลื่อนหรือยกเลิกคลาสอย่างไร?', 'กำหนดช่องทางติดต่อและระยะเวลาแจ้งล่วงหน้าให้ชัด แล้วทดลองขั้นตอนเปลี่ยนรายการกับทีมงานก่อนเปิดรับจอง'],
        ['ราคาเท่าไร และทดลองใช้ได้ไหม?', 'ส่งตารางคลาสและจำนวนที่รับต่อรอบ เพื่อดูระบบ สอบถามราคาและเงื่อนไขทดลองใช้ก่อนตัดสินใจ']
      ]
    },
    en: {
      valueTitle: 'Start teaching with your booking list ready',
      values: [
        ['Let customers pick a session', 'Link from LINE OA so customers can choose the class, date and time without asking about each session.'],
        ['Match places to your space', 'From group classes to one-to-one training, set capacity around your space, equipment and instructor availability.'],
        ['Set up for the people booked', 'Check names and booking statuses before arranging equipment and training space.']
      ],
      launchTitle: 'Start with your class schedule',
      launch: [
        ['Choose your bookable classes', 'Prepare names, times and participant capacity.'],
        ['Try one session', 'Walk through a customer booking, then find it in your booking list.'],
        ['Share through LINE OA', 'Let customers choose, then check the list before teaching.']
      ],
      faqs: [
        ['Can we use our existing LINE OA?', 'Yes. Use it to link customers to the booking page. We can review the connection before launch.'],
        ['Can we offer group and private sessions?', 'Plan slots by class type and capacity. If sessions share an instructor or equipment, bring a sample schedule so we can review it first.'],
        ['How should we set session capacity?', 'Base capacity on the equipment, space and instructors available. For example, offer ten places for group fitness, six for small-group boxing or one for personal training.'],
        ['How do students change or cancel a class?', 'Set a clear contact channel and notice period. Walk through the process for changing bookings with us before launch.'],
        ['How much does it cost? Is there a trial?', 'Share your class schedule and capacity to request pricing and available trial terms. See the system before deciding.']
      ]
    }
  },
  services: {
    th: {
      valueTitle: 'รู้ว่าลูกค้าจองอะไร ก่อนเริ่มบริการ',
      values: [
        ['เลือกบริการและเวลาในครั้งเดียว', 'ลูกค้าเปิดลิงก์จาก LINE OA แล้วเลือกบริการ วัน และเวลาที่ร้านเปิดรับ'],
        ['วางนัดตามเวลาที่ใช้จริง', 'คุณกำหนดรอบให้ครอบคลุมเวลาบริการ และเผื่อช่วงเตรียมห้องก่อนนัดถัดไป'],
        ['เปิดรายการแล้วเตรียมงาน', 'ดูบริการที่จอง เวลา และสถานะ พร้อมย้อนดูประวัติการจองเมื่อต้องตรวจรายละเอียด']
      ],
      launchTitle: 'เริ่มจากบริการที่คุณมี',
      launch: [
        ['เลือกบริการและระยะเวลา', 'ระบุเวลาทำงาน รวมช่วงเตรียมห้องหรืออุปกรณ์'],
        ['วางรอบที่พร้อมรับ', 'กำหนดเวลาและจำนวนลูกค้าตามทีมที่ดูแลได้'],
        ['เปิดจองผ่าน LINE OA', 'ลูกค้าเลือกรอบ ร้านตรวจรายการเพื่อเตรียมบริการ']
      ],
      faqs: [
        ['เหมาะกับบริการแบบไหน?', 'เหมาะกับงานที่กำหนดวัน เวลา และจำนวนผู้รับบริการได้ เช่น นวด สปา ทรีตเมนต์ และนัดปรึกษา'],
        ['ใช้ LINE OA เดิมได้ไหม?', 'ได้ ใช้เป็นช่องทางเปิดหน้าจอง และยังคุยรายละเอียดบริการกับลูกค้าผ่านแชทเดิมได้'],
        ['ลูกค้าเลือกพนักงานหรือห้องได้ไหม?', 'ส่งรูปแบบการเลือกพนักงาน ห้อง หรืออุปกรณ์ที่ต้องการ เราจะตรวจและยืนยันการรองรับก่อนเริ่มใช้'],
        ['ต้องเผื่อเวลาระหว่างนัดไหม?', 'ควรเผื่อในตารางตามงานจริง เช่น บริการ 60 นาทีและเตรียมห้อง 15 นาที ก่อนเปิดรอบถัดไป ให้ทีมงานช่วยตรวจรูปแบบการตั้งค่า'],
        ['ราคาเท่าไร และทดลองใช้ได้ไหม?', 'ส่งตัวอย่างบริการ ระยะเวลา และจำนวนที่รับ เพื่อขอราคาและเงื่อนไขทดลองใช้ พร้อมดูเส้นทางจองก่อนตัดสินใจ']
      ]
    },
    en: {
      valueTitle: 'Know what is booked before you begin',
      values: [
        ['Choose a service and time together', 'Customers open the link from LINE OA and select a service, date and appointment time.'],
        ['Plan for the time the work takes', 'Choose slots around service duration and leave time to prepare for the next customer.'],
        ['See the appointment, prepare the service', 'Check the booked service, time and status. Refer to booking history when you need earlier details.']
      ],
      launchTitle: 'Start with the services you offer',
      launch: [
        ['Choose services and durations', 'Include time to prepare rooms or equipment.'],
        ['Plan available appointments', 'Set times and capacity your team can manage.'],
        ['Share through LINE OA', 'Customers pick a slot; your team prepares from the list.']
      ],
      faqs: [
        ['Which services does it suit?', 'Services with a defined date, time and capacity, such as massage, spa treatments and consultations.'],
        ['Can we use our existing LINE OA?', 'Yes. Link to your booking page and keep your existing chat for questions about services.'],
        ['Can customers select a person or room?', 'Tell us how customers need to choose staff, rooms or equipment. We’ll review the workflow and confirm support before you start.'],
        ['Should we allow time between appointments?', 'Plan preparation time around your work, such as a 60-minute service followed by 15 minutes to prepare the room. We can review the setup with you.'],
        ['How much does it cost? Is there a trial?', 'Share sample services, durations and capacity to request pricing and available trial terms. See the booking process before deciding.']
      ]
    }
  }
};
