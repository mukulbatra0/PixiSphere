import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import StarRating from "./ui/StarRating";
import Tag from "./ui/Tag";
import Button from "./ui/Button";

/**
 * @typedef {import("../types/index.js").Photographer} Photographer
 */

/**
 * @typedef {Object} PhotographerCardProps
 * @property {Photographer} photographer
 * @property {number} index
 */

/**
 * @param {PhotographerCardProps} props
 */
const PhotographerCard = ({ photographer, index }) => {
  const { id, name, location, price, rating, tags, profilePic } = photographer;
  const [imgSrc, setImgSrc] = React.useState(
    profilePic && profilePic.trim() !== "" ? profilePic : "/images/stock1.jpg"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imgSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImgSrc("/images/stock1.jpg")}
          priority={index < 3}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-black">{name}</h3>
          <StarRating rating={rating} />
        </div>

        <div className="flex items-center text-black mb-3">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              color={tag === "Maternity" ? "primary" : "gray"}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-black font-semibold">
            ₹{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <Link href={`/profile/${id}`} passHref>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotographerCard;