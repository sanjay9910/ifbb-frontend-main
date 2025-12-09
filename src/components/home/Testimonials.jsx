import React from 'react';

const testimonials = [
  {
    name: 'Cameron Williamson',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: `The certificate course exceeded all my expectations. The program was well-structured, hands-on, and taught by experienced professionals who truly care about your growth. I gained in-depth knowledge about fitness, nutrition, and training techniques that not only helped me improve personally but also prepared me to start a career in the fitness industry. This course gave me both the skills and the confidence I needed. Highly recommended.`,
  },
  {
    name: 'Cameron Williamson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: `The certificate course exceeded all my expectations. The program was well-structured, hands-on, and taught by experienced professionals who truly care about your growth. I gained in-depth knowledge about fitness, nutrition, and training techniques that not only helped me improve personally but also prepared me to start a career in the fitness industry. This course gave me both the skills and the confidence I needed. Highly recommended.`,
  },
  {
    name: 'Cameron Williamson',
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    text: `The certificate course exceeded all my expectations. The program was well-structured, hands-on, and taught by experienced professionals who truly care about your growth. I gained in-depth knowledge about fitness, nutrition, and training techniques that not only helped me improve personally but also prepared me to start a career in the fitness industry. This course gave me both the skills and the confidence I needed. Highly recommended.`,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-20">Testimonials</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 text-center rounded-lg shadow-sm"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-white shadow-md"
            />
            <p className="mt-6 text-gray-700 text-sm">{testimonial.text}</p>
            <h3 className="mt-6 font-semibold text-lg">
              {testimonial.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
