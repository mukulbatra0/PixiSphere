'use client';

import React, { useEffect, useState, use as usePromise } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Photographer } from '@/types';
import StarRating from '@/components/ui/StarRating';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function PhotographerProfile({ params }: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  // Support both direct and Promise params for migration compatibility
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  useEffect(() => {
    if (params instanceof Promise) {
      params.then(setResolvedParams);
    } else {
      setResolvedParams(params);
    }
  }, [params]);
  
  useEffect(() => {
    if (!resolvedParams) return;
    const fetchPhotographer = async () => {
      try {
        const response = await fetch(`http://localhost:3001/photographers/${resolvedParams.id}`);
        if (!response.ok) throw new Error('Photographer not found');
        const data = await response.json();
        setPhotographer(data);
        if (data.portfolio && data.portfolio.length > 0) {
          setActiveImage(data.portfolio[0]);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPhotographer();
  }, [resolvedParams]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    // Show success message (in a real app)
    alert('Inquiry sent successfully!');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !photographer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error || 'Photographer not found'}</p>
        <Link href="/category" className="mt-6">
          <Button>Back to Photographers</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Link href="/category" className="mr-4">
                <Button variant="outline" size="sm">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-black">{photographer.name}</h1>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 p-6">
                <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                  {photographer.profilePic ? (
                    <Image
                      src={photographer.profilePic}
                      alt={photographer.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/images/stock1.jpg"
                      alt="Default profile"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-1 text-black">{photographer.name}</h2>
                  <div className="flex items-center mb-2">
                    <StarRating rating={photographer.rating} size="lg" />
                  </div>
                  <div className="my-6 flex justify-center">
                    <div className="w-full">
                      <Button 
                        fullWidth 
                        variant="primary"
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <span className="flex items-center gap-2 bg-white text-black shadow-lg border border-black rounded-md py-2 px-4 w-full justify-center focus:ring-4 focus:ring-black/30">
                          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4.5M16 7l-4 4-4-4" /></svg>
                          Send Inquiry
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-800 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{photographer.location}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2 text-black">Starting Price</h3>
                  <p className="text-2xl font-bold text-black">₹{photographer.price.toLocaleString()}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2 text-black">Styles</h3>
                  <div className="flex flex-wrap gap-2">
                    {photographer.styles.map(style => (
                      <Tag key={style} label={style} color="primary" />
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2 text-black">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {photographer.tags.map(tag => (
                      <Tag key={tag} label={tag} color="secondary" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-black">About</h3>
                  <p className="text-gray-800">{photographer.bio}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-black">Portfolio</h3>
                  
                  <div className="mb-4">
                    <div className="relative h-80 w-full rounded-lg overflow-hidden">
                      {(activeImage || photographer.portfolio[0]) ? (
                        <Image
                          src={activeImage || photographer.portfolio[0]}
                          alt="Portfolio"
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <Image
                          src="/images/stock1.jpg"
                          alt="Default portfolio"
                          width={400}
                          height={400}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {photographer.portfolio.map((image, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`relative h-20 rounded-md overflow-hidden cursor-pointer ${activeImage === image ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setActiveImage(image)}
                      >
                        {image ? (
                          <Image
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            src="/images/stock1.jpg"
                            alt="Default portfolio"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-black">Reviews</h3>
                  
                  {photographer.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {photographer.reviews.map((review, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-black">{review.name}</h4>
                              <StarRating rating={review.rating} size="sm" />
                            </div>
                            <span className="text-sm text-gray-600">{review.date}</span>
                          </div>
                          <p className="text-gray-800">{review.comment}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No reviews yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Inquiry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-black">Send Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-black"
                  />
                </div>
                <div>
                  <Button type="submit" fullWidth variant="outline">
                    <span className="text-black border-black">Send</span>
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
