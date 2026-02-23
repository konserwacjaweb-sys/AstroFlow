import { motion } from 'motion/react';
import { Warehouse, Truck, Package, BarChart3, Shield } from 'lucide-react';

import shieldImg from '@assets/zalety-bg.jpg';
import logo from '@assets/logo_jednolite.png';

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
      <div className={`relative h-full overflow-hidden rounded-4xl transition-all duration-300 ${!showImage ? 'bg-[oklch(0.96_0_0/0.5)]' : ''}`}>
        {/* Image */}
        {showImage && 'image' in feature && (
          <div className="relative h-full min-h-64 overflow-hidden">
            <motion.img
              src={feature.image.src}
              alt={feature.title}
              className="h-full w-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Logo w lewym dolnym rogu */}
            <div className="absolute bottom-6 left-6">
              <img 
                src={logo.src} 
                alt="Logo" 
                className="h-17.5 w-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* Content - tylko dla kart bez obrazu */}
        {!showImage && (
          <div className="py-15 px-10 text-slate-900">
            <h3 className="!text-[2.1rem] mb-6 leading-normal">{feature.title}</h3>
            <p className="text-slate-900 opacity-90">{feature.description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[11fr_9fr]">
      <div className="grid grid-cols-1 gap-6 auto-rows-fr sm:grid-cols-2">
        {leftFeatures.map((feature, index) => renderCard(feature, index, false))}
      </div>
      <div className="grid grid-cols-1 gap-8 auto-rows-fr">
        {rightFeatures.map((feature, index) => renderCard(feature, index + leftFeatures.length, true))}
      </div>
    </div>
  );
}

