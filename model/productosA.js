const mongoose = require('mongoose');

const productosASchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ProductosA', productosASchema);


/* 
{
        id: 1,
        title: 'Intel Core i9-10100',
        description: 'Procesador Intel Core i7-10100.',
        price: '1499',
        image: "https://web.opendrive.com/api/v1/download/file.json/MjdfMjA3Nzc5NjhfVWtUcEg?session_id=0b2b02a3ebe29ae0379d5aa006b1964476fae68e4970c37b2ed79197e0978d1c&inline=1&preview=1"
    },
    {
        id: 2,
        title: 'AMD Ryzen 7 5800X',
        description: '8 núcleos optimizados para plataformas de juegos con FPS altos.',
        price: '2008',
        image: "https://web.opendrive.com/api/v1/download/file.json/MjdfMjA3Nzc5ODhfQUJJZ1c?session_id=0b2b02a3ebe29ae0379d5aa006b1964476fae68e4970c37b2ed79197e0978d1c&inline=1&preview=1"
    },
    {
        id: 3,
        title: "AMD Ryzen 9 5950X",
        description: 'Un procesador con el que podrás jugar y crear por igual. ​16 núcleos. 0 compromisos',
        price: "3109",
        image: "https://web.opendrive.com/api/v1/download/file.json/MjdfMjA3Nzc5MjVfbzJBTkU?session_id=0b2b02a3ebe29ae0379d5aa006b1964476fae68e4970c37b2ed79197e0978d1c&inline=1&preview=1"
    },
    {
        id: 4,
        title: "Intel Core i9-10900K",
        description: 'Cantidad de núcleos. 10 ; Cantidad de subprocesos. 20 ; Frecuencia turbo máxima. 5.30 GHz ; Frecuencia de Intel®️ Thermal Velocity Boost.',
        price: "3109",
        image: "https://web.opendrive.com/api/v1/download/file.json/MjdfMjA3Nzc5NTFfS282Nk0?session_id=0b2b02a3ebe29ae0379d5aa006b1964476fae68e4970c37b2ed79197e0978d1c&inline=1&preview=1"
    },
    {
        id: 5,
        title: "Tarjeta Madre B75-S",
        description: 'Placa base para PC ATX 4 PC DDR3 Memoria 32GB Computadoras de escritorio Placa b.',
        price: "792",
        image: "https://i5.walmartimages.com.mx/mg/gm/3pp/asr/5ff52744-c1c4-4c36-9bc3-485dfe54fe08.94df72ceb22ded3938614c77cc0ac168.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
    },
    {
        id: 6,
        title: "Asus ROG STRIX B550-F GAMING AM4",
        description: '8 núcleos optimizados para plataformas de juegos con FPS altos.',
        price: "2842",
        image: "https://www.asus.com/media/odin/websites/MX/News/egeudlmmzdyg3wv1/890e5811-aa33-c629-08eb-a9892ebefa13.jpg"
    },
    {
        id: 7,
        title: "TUF Gaming X570-Pro WiFi II",
        description: 'ofrece confiabilidad probada en batalla para cualquier compilación gaming.',
        price: "8,399.00",
        image: "https://lb1.highpro.com.mx/2240-large_default/tarjeta-madre-asus-rog-strix-b550-f-gaming-am4.jpg"
    },
    {
        id: 8,
        title: "ASUS ROG STRIX Z690-E GAMING WIFI DDR5LGA1700/WIFI/RGB",
        description: 'Cantidad de núcleos. 10 ; Cantidad de subprocesos. 20 ; Frecuencia turbo máxima. 5.30 GHz ; Frecuencia de Intel®️ Thermal Velocity Boost..',
        price: "8,399.00",
        image: "https://www.pchmayoreo.com/pub/media/catalog/product/1/9/195553494632-a-01.png"
    },
    {
        id: 9,
        title: "Cooler Master - Hyper 212 Black Edition con LGA1700",
        description: 'Disipador para CPU Disipador y Ventilador para Procesador Cooler Master Hyper 212 Black Edition Con LGA1700 - 120mm X1 Intel y AMD / RR-212S-20PK-R2',
        price: "845",
        image: "https://bajapc.com.mx/assets/uploads/sw_yey_4_2023_02_08t152405_744.png?1675899251"
    },
    {
        id: 10,
        title: "Cooler Master i71C RGB",
        description: 'Disipador de calor Cooler Master i71C RGB / Compatible con intel 115X / Aura Sync / RGB Fusion / Ventilador de 120mm',
        price: "345",
        image: "https://bajapc.com.mx/assets/uploads/sw_1_372.png?1620856886"
    },
    {
        id: 11,
        title: "DeepCool AG620 BK ARGB",
        description: 'Disipador para CPU DeepCool AG620 BK ARGB / 120mm / 300-1850RPM / Negro / R-AG620-BKANMN-G-2',
        price: "839",
        image: "https://bajapc.com.mx/assets/uploads/sw_1_1446.png?1698955352"
    },
    {
        id: 12,
        title: "DeepCool AK400 ZERO DARK PLUS",
        description: 'Disipador DeepCool AK400 ZERO DARK PLUS / 120mm / 500-1650RPM / Negro / R-AK400-BKNNMD-G-1',
        price: "819",
        image: "https://bajapc.com.mx/assets/uploads/sw_1_1446.png?1698955352"
    },
    {
        id: 13,
        title: "DeepCool AK400 ZERO DARK PLUS",
        description: 'Disipador DeepCool AK400 ZERO DARK PLUS / 120mm / 500-1650RPM / Negro / R-AK400-BKNNMD-G-1',
        price: "819",
        image: "https://bajapc.com.mx/assets/uploads/sw_1_1446.png?1698955352"
    }
*/