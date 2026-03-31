import { Star, Quote } from "lucide-react";

interface Review {
    id: number;
    name: string;
    role: string;
    rating: number;
    comment: string;
    date: string;
    avatar: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "Dr. Priya Sharma",
        role: "General Physician",
        rating: 5,
        comment:
            "Mitrro has been my go-to platform for ordering medical supplies. The quality is consistently excellent and delivery is always on time. Highly recommended for healthcare professionals!",
        date: "March 15, 2026",
        avatar: "PS",
    },
    {
        id: 2,
        name: "Rahul Verma",
        role: "Hospital Administrator",
        rating: 5,
        comment:
            "We switched to Mitrro for our hospital's bulk orders and couldn't be happier. The pricing is competitive and the customer support team is incredibly responsive.",
        date: "March 10, 2026",
        avatar: "RV",
    },
    {
        id: 3,
        name: "Dr. Anita Reddy",
        role: "Dermatologist",
        rating: 4,
        comment:
            "Great range of wound care products. I particularly appreciate the detailed product descriptions that help me choose the right supplies for my patients.",
        date: "February 28, 2026",
        avatar: "AR",
    },
    {
        id: 4,
        name: "Sandeep Kumar",
        role: "Lab Technician",
        rating: 5,
        comment:
            "The lab diagnostics equipment I ordered arrived in perfect condition with all certifications. Mitrro truly understands the needs of healthcare workers.",
        date: "February 20, 2026",
        avatar: "SK",
    },
    {
        id: 5,
        name: "Dr. Fatima Naaz",
        role: "Pathologist",
        rating: 5,
        comment:
            "Exceptional product quality and the best prices I've found online. The Big Savings section always has amazing deals on essentials we use daily.",
        date: "February 15, 2026",
        avatar: "FN",
    },
    {
        id: 6,
        name: "Vikram Singh",
        role: "Pharmacist",
        rating: 4,
        comment:
            "Ordering is seamless and the search feature makes it easy to find exactly what I need. Their healthcare essentials collection is very comprehensive.",
        date: "February 8, 2026",
        avatar: "VS",
    },
    {
        id: 7,
        name: "Dr. Meera Joshi",
        role: "Surgeon",
        rating: 5,
        comment:
            "I've been recommending Mitrro to all my colleagues. The advanced wound care products are top-notch and the delivery packaging ensures everything arrives sterile.",
        date: "January 30, 2026",
        avatar: "MJ",
    },
    {
        id: 8,
        name: "Arjun Patel",
        role: "Clinic Owner",
        rating: 5,
        comment:
            "Mitrro has simplified our procurement process completely. From ordering to delivery, everything is professional and hassle-free. A truly reliable partner!",
        date: "January 22, 2026",
        avatar: "AP",
    },
];

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
            />
        ))}
    </div>
);

const CustomerReviews = () => {
    return (
        <section className="py-16 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-3">
                        What Our
                        <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
                            Customers Say
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Trusted by thousands of healthcare professionals across India
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className="bg-background rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col animate-slide-up"
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            {/* Quote Icon */}
                            <Quote className="h-6 w-6 text-primary/30 mb-3" />

                            {/* Comment */}
                            <p
                                className="text-sm text-muted-foreground leading-relaxed flex-grow mb-4"
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {review.comment}
                            </p>

                            {/* Rating */}
                            <div className="mb-4">
                                <StarRating rating={review.rating} />
                            </div>

                            {/* Reviewer Info */}
                            <div className="flex items-center gap-3 pt-4 border-t">
                                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                    {review.avatar}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-sm truncate">{review.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {review.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
