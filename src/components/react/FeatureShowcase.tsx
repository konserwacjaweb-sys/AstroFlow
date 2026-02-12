import { motion } from 'motion/react';
import { Warehouse, Truck, Package, BarChart3, Shield, Headphones } from 'lucide-react';

import warehouseImg from '@assets/photo-1553413077-190dd305871c.jpg';
import truckImg from '@assets/photo-1601584115197-04ecc0da31d7.jpg';
import packageImg from '@assets/photo-1581091226825-a6a2a5aee158.jpg';
import barChart3Img from '@assets/photo-1551288049-bebda4e38f71.jpg';
import shieldImg from '@assets/photo-1563013544-824ae1b704d3.jpg';
import headphonesImg from '@assets/photo-1486312338219-ce68d2c6f44d.jpg';

const features = [
  {
    icon: Warehouse,
    title: 'Advanced Warehousing',
    description: 'Climate-controlled facilities with automated inventory systems and 24/7 security.',
    image: warehouseImg,
  },
  {
    icon: Truck,
    title: 'Fast Transportation',
    description: 'Multi-modal logistics network ensuring rapid delivery across all destinations.',
    image: truckImg,
  },
  {
    icon: Package,
    title: 'Quality Manufacturing',
    description: 'ISO-certified production with precision engineering and quality control.',
    image: packageImg,
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Complete supply chain visibility with advanced tracking and reporting.',
    image: barChart3Img,
  },
  {
    icon: Shield,
    title: 'Secure Operations',
    description: 'Industry-leading security protocols protecting your valuable assets.',
    image: shieldImg,
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated teams available around the clock to ensure seamless operations.',
    image: headphonesImg,
  },
];

export default function FeatureShowcase() {
  const leftFeatures = features.slice(0, 4);
  const rightFeatures = features.slice(4, 5);

  const renderCard = (feature: (typeof features)[number], index: number) => (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full cursor-pointer"
    >
      <div className="relative h-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
        {/* Image */}
        <div className="relative h-full min-h-64 overflow-hidden">
          <motion.img
            src={feature.image.src}
            alt={feature.title}
            className="h-full w-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />

          {/* Icon overlay */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-lg"
          >
            <feature.icon className="h-6 w-6 text-blue-600" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
          <p className="text-sm text-gray-200 opacity-90">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[11fr_9fr]">
      <div className="grid grid-cols-1 gap-8 auto-rows-fr sm:grid-cols-2">
        {leftFeatures.map((feature, index) => renderCard(feature, index))}
      </div>
      <div className="grid grid-cols-1 gap-8 auto-rows-fr">
        {rightFeatures.map((feature, index) => renderCard(feature, index + leftFeatures.length))}
      </div>
    </div>
  );
}

