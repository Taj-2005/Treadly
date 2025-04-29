import Card from "../Card/Card";

export default function Places() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10 bg-[#fef7f1]">
            <Card title="Hyderabad" description="Hyderabad is a vibrant blend of rich history and modern innovation, known for its iconic Charminar, biryani, and thriving tech industry." image="https://media.istockphoto.com/id/1215274990/photo/high-wide-angle-view-of-charminar-in-the-night.jpg?s=1024x1024&w=is&k=20&c=8VF8tsWn8Iy5Ls8vTAo73rQntfzSYsK5pAAJDcP4oUE="/>
            <Card title="Vizag" description="Vizag, or Visakhapatnam, is a coastal city in India known for its stunning beaches, scenic hills, and rich maritime history." image="https://images.unsplash.com/photo-1609854534028-b512f5246abc?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <Card title="Araku Valley" description="Araku Valley is a scenic hill station in Andhra Pradesh, known for its lush green valleys, coffee plantations, and tribal culture." image="https://plus.unsplash.com/premium_photo-1675448891151-5fbb19c7d80c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </div>
    )
}