import { ArrowLeft, CircleAlert, Clock, Gift, Heart, House, MessageCircle, Shield, User } from "lucide-react"
import Sidebar from './Dashboard/Sidebar';
import { useEffect, useState } from "react";
import { ref, onValue } from 'firebase/database'
import { db } from "../config/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";


const Message = () => {

  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const navigate = useNavigate();

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
  
      return () => unsubscribe();
    }, []);

    // console.log('data from sidebar', relationships)

    const singleRelationship = relationships.find(
      (relationship) => relationship.id === id
    )

    console.log(singleRelationship)

  return (
    <div className=" container mt-16">
      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 rounded-full bg-pink-200 flex justify-center items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {singleRelationship?.relationshipTitle}
          </h1>
          <button className="p-1 border border-gray-300 rounded-3xl text-xs font-bold">
            {singleRelationship?.status}
          </button>
        </div>
      </div>

      <div className="flex gap-24 mt-10">
        {/* sidebar */}
        <div className=" w-[30%]">
          <div className="flex items-center gap-2">
            <div className="text-pink-500">
              <CircleAlert />
            </div>

            <div>
              <h1 className="font-semibold">Relationship Details</h1>
            </div>
          </div>

          <h1 className="text-gray-500 my-3 font-medium">
            Key information about your relationship
          </h1>

          <div className="flex gap-2 mt-6">
            <div className="h-2 text-gray-500">
              <Clock />
            </div>

            <div>
              <h1 className="font-medium">Length</h1>
              <p className="text-gray-500">
                {singleRelationship?.relationshipLength}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-3 border-b border-gray-300 pb-3">
            <div className="h-2 text-gray-500">
              <House />
            </div>

            <div>
              <h1 className="font-medium">Living Status</h1>
              <p className="text-gray-500">
                {singleRelationship?.livingStatus}
              </p>
            </div>
          </div>

          <div className="flex items-center mb-3 mt-3">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-sm font-bold text-gray-700">
              Personality Profiles
            </h2>
          </div>

          <div className="max-w-md mx-auto px-6 border-b border-gray-300 pb-3">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
                <span className="text-sm font-medium">P</span>
              </div>
              <span className="text-sm font-medium">Person 1</span>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">Love Language</div>
                <div className="flex items-center">
                  <Gift className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {singleRelationship?.loveLanguage1}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Communication</div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {singleRelationship?.communicationStyle1}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Conflict Style</div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {singleRelationship?.conflictStyle1}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Attachment</div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {singleRelationship?.attachmentStyle1}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto px-6 pt-3">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
                <span className="text-sm font-medium">P</span>
              </div>
              <span className="text-sm font-medium">Person 2</span>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">Love Language</div>
                <div className="flex items-center">
                  <Gift className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {singleRelationship?.loveLanguage2}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Communication</div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {singleRelationship?.communicationStyle2}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Conflict Style</div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {singleRelationship?.conflictStyle2}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Attachment</div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {singleRelationship?.attachmentStyle2}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="border border-red-500 w-[70%]">
          <div className="flex items-center gap-2">
            <div className="text-pink-500">
              <CircleAlert />
            </div>

            <div>
              <h1 className="font-semibold">Relationship Details</h1>
            </div>
          </div>

          <h1 className="text-gray-500 my-3 font-medium">
            Key information about your relationship
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Message