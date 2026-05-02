import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Search, Filter } from 'lucide-react';

const categories = ["All", "Lamborghini", "Mercedes", "Corvette", "BMW", "Milwaukee", "Chicago"];

const cars = [
  { id: 1, name: "Chevrolet Corvette C8", category: "Corvette", price: 550, hp: 495, speed: "194 MPH", location: "Milwaukee", deposit: 1000, image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Mercedes-Benz G63", category: "Mercedes", price: 900, hp: 577, speed: "149 MPH", location: "Chicago", deposit: 1500, image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Lamborghini Urus — Red", category: "Lamborghini", price: 1300, hp: 641, speed: "190 MPH", location: "Chicago", deposit: 2000, image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Mercedes-Benz S580", category: "Mercedes", price: 700, hp: 496, speed: "155 MPH", location: "Chicago", deposit: 1000, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Lamborghini Huracan LP 610-4", category: "Lamborghini", price: 1300, hp: 610, speed: "201 MPH", location: "Chicago", deposit: 2000, image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Lamborghini Huracan Evo Spyder", category: "Lamborghini", price: 1500, hp: 631, speed: "201 MPH", location: "Chicago", deposit: 2000, image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "BMW M4 Competition", category: "BMW", price: 595, hp: 503, speed: "180 MPH", location: "Chicago", deposit: 1000, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "Rolls-Royce Ghost", category: "Rolls-Royce", price: 995, hp: 563, speed: "155 MPH", location: "Chicago", deposit: 2500, image: "https://images.unsplash.com/photo-1631215233157-5b865668d90f?auto=format&fit=crop&q=80&w=800" },
  { id: 9, name: "Cadillac Escalade ESV", category: "Cadillac", price: 550, hp: 420, speed: "130 MPH", location: "Chicago", deposit: 1000, image: "https://images.unsplash.com/photo-1604054945110-67e411b95ff8?auto=format&fit=crop&q=80&w=800" },
  { id: 10, name: "BMW I8 Roadster", category: "BMW", price: 495, hp: 369, speed: "155 MPH", location: "Chicago", deposit: 1000, image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=800" },
];

interface InventoryProps {
  onClose: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCars = cars.filter(car => 
    (activeCategory === "All" || car.category === activeCategory || car.location === activeCategory) &&
    (car.name.toLowerCase().includes(search.toLowerCase()) || car.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-luxury-black overflow-y-auto px-6 py-10 md:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
          <div>
            <div className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold mb-4">Elite Exotic Rentals by APX Luxury</div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold uppercase tracking-tighter leading-none">
              The <span className="text-white/20 text-outline">Marque</span> <br/> Of Distinction.
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors pointer-events-auto"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-16 border-b border-white/5 pb-10">
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat ? 'bg-accent text-black' : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input 
              type="text"
              placeholder="Search model or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-accent/40 placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-[#111112] border border-white/5 hover:border-accent/20 transition-all overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-sm flex flex-col items-end">
                    <span className="text-[10px] font-bold text-accent">${car.price}/D</span>
                    <span className="text-[7px] text-white/40 uppercase tracking-widest">{car.location}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8">
                  <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">{car.category}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter mb-6 group-hover:text-accent transition-colors">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                    <div>
                      <div className="text-[9px] uppercase text-white/20 tracking-widest mb-1">Deposit</div>
                      <div className="text-sm font-bold tracking-tighter">${car.deposit}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-white/20 tracking-widest mb-1">Max Speed</div>
                      <div className="text-sm font-bold tracking-tighter">{car.speed}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                
                <button className="absolute bottom-8 right-8 w-10 h-10 bg-accent text-black rounded-sm flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all delay-100">
                  <ArrowUpRight size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCars.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/20 uppercase tracking-[0.5em] text-xs">No matching vehicles found in our collection.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Inventory;
