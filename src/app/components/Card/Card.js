export default function Card({ title, description, image }) {
    return (
      <div className="relative w-full max-w-sm overflow-hidden rounded-lg shadow-xl group">
        <img src={image} alt={title} width={500} height={500} className="w-full h-80 object-cover" />

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
  
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-white text-xl font-bold drop-shadow">{title}</h2>
          <p className="text-white text-sm mt-1 drop-shadow">{description}</p>
        </div>
      </div>
    );
  }
  