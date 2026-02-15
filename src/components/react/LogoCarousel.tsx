// Możesz dodać własne loga importując je z folderu assets
// import logo1 from '@assets/logo1.png';
// Na razie używam placeholderów, które możesz później zamienić
const logos = [
  { src: 'https://via.placeholder.com/150x80?text=Logo+1', alt: 'Partner 1' },
  { src: 'https://via.placeholder.com/150x80?text=Logo+2', alt: 'Partner 2' },
  { src: 'https://via.placeholder.com/150x80?text=Logo+3', alt: 'Partner 3' },
  { src: 'https://via.placeholder.com/150x80?text=Logo+4', alt: 'Partner 4' },
  { src: 'https://via.placeholder.com/150x80?text=Logo+5', alt: 'Partner 5' },
  { src: 'https://via.placeholder.com/150x80?text=Logo+6', alt: 'Partner 6' },
];

export default function LogoCarousel() {
  return (
    <div className="logo-carousel">
      <div className="logo-track">
        {/* Pierwsze zestawy logo */}
        {logos.map((logo, index) => (
          <div key={`logo-1-${index}`} className="logo-item">
            <img 
              src={logo.src} 
              alt={logo.alt}
              className="h-16 lg:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            />
          </div>
        ))}
        {/* Duplikat dla płynnej animacji */}
        {logos.map((logo, index) => (
          <div key={`logo-2-${index}`} className="logo-item">
            <img 
              src={logo.src} 
              alt={logo.alt}
              className="h-16 lg:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
