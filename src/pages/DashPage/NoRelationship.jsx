import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebaseConfig";
import DashNav from "../Dashboard/DashNav";

const NoRelationship = () => {
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [viewMode, setViewMode] = useState('grid')

  // get data form firebase
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const relationshipsRef = ref(db, `users/${user.uid}/formSubmissions`);
    const unsubscribe = onValue(relationshipsRef, (snapshot) => {
      const data = snapshot.val();
      const relationshipsArray = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : [];
      setRelationships(relationshipsArray);
      setLoading(false);
    });
    console.log("From no relationship",relationships);

    return () => unsubscribe();
  }, []);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const formatDuration = (months) => {
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} year${years > 1 ? "s" : ""}${
        remainingMonths
          ? ` ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
          : ""
      }`;
    }
    return `${months} month${months > 1 ? "s" : ""}`;
  };

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  };

  const renderValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return (
        <div className="ml-4 space-y-2">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey}>
              <span className="text-gray-500 font-medium">
                {formatKey(subKey)}:
              </span>{" "}
              {subValue}
            </div>
          ))}
        </div>
      );
    }
    return value;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C62553]"></div>
      </div>
    );
  }

  if (!relationships.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl font-bold text-[#C62553] mb-4">
          Relationship Ai
        </h1>
        <p className="text-gray-500 mb-8 text-xl">
          What relationship would you like to discuss?
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-pink-500 to-[#C62553] text-white font-medium py-2 px-6 rounded-full"
        >
          Create Your First Relationship
        </Link>
      </div>
    )
  }
  console.log("NO relatinship jsx page ===",relationships)

  return (
    <div>
      {/* navbar */}
      <DashNav viewMode={viewMode} setViewMode={setViewMode} />

      {/* content */}
      <div className="h-full p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#C62553] mb-8 text-center">
          Your Relationships
        </h1>
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'grid grid-cols-1 gap-8'
          }
        >
          {relationships.map((relationship) => (
            <Link to={`/messages/${relationship.id}`}>
              <div
                key={relationship.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => toggleExpand(relationship.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {relationship.relationshipTitle || 'Unnamed Relationship'}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {relationship.basicInfo?.relationshipType} •{' '}
                      {relationship.basicInfo?.duration &&
                        ` ${formatDuration(
                          relationship.basicInfo.duration
                        )} • `}{' '}
                      {new Date(relationship.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        relationship.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {relationship.status}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          {/* <Link
          to="/"
          className="bg-gradient-to-r from-pink-500 to-[#C62553] text-white font-medium py-2 px-6 rounded-full"
        >
          Add New Relationship
        </Link> */}
        </div>
      </div>
    </div>
  )
};

export default NoRelationship;
