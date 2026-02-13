import { motion } from 'motion/react';
import { Warehouse, Truck, Package, BarChart3, Shield } from 'lucide-react';

import shieldImg from '@assets/photo-1563013544-824ae1b704d3.jpg';

const leftFeatures = [
  {
    icon: Warehouse,
    title: 'Advanced Warehousing',
    description: 'Climate-controlled facilities with automated inventory systems and 24/7 security.',
  },
  {
    icon: Truck,
    title: 'Fast Transportation',
    description: 'Multi-modal logistics network ensuring rapid delivery across all destinations.',
  },
  {
    icon: Package,
    title: 'Quality Manufacturing',
    description: 'ISO-certified production with precision engineering and quality control.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Complete supply chain visibility with advanced tracking and reporting.',
  },
];

const rightFeatures = [
  {
    icon: Shield,
    title: 'Secure Operations',
    description: 'Industry-leading security protocols protecting your valuable assets.',
    image: shieldImg,
  },
];

export default function FeatureShowcase() {
  const renderCard = (feature: (typeof leftFeatures)[number] | (typeof rightFeatures)[number], index: number, showImage: boolean = true) => (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full cursor-pointer"
    >
      <div className={`relative h-full overflow-hidden rounded-4xl transition-all duration-300 ${!showImage ? 'bg-[oklch(0.96_0_0_/_0.5)]' : ''}`}>
        {/* Image */}
        {showImage && (
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
          </div>
        )}

        {/* Content */}
        <div className={`${showImage ? 'absolute bottom-0 left-0 right-0 p-6 text-white' : 'p-6 text-slate-900'}`}>
          <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
          <p className={`text-sm opacity-90 ${showImage ? 'text-gray-200' : 'text-slate-600'}`}>{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[11fr_9fr]">
      <div className="grid grid-cols-1 gap-8 auto-rows-fr sm:grid-cols-2">
        {leftFeatures.map((feature, index) => renderCard(feature, index, false))}
      </div>
      <div className="grid grid-cols-1 gap-8 auto-rows-fr">
        {rightFeatures.map((feature, index) => renderCard(feature, index + leftFeatures.length, true))}
      </div>
    </div>
  );
}

