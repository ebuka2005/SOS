import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase';  // Ensure the correct path to your firebase.js


const favoriteContacts = [
    {
      name: "911",
      icon: "fa-phone-alt",
      bg: "bg-red-100",
      textColor: "text-red-500",
    },
    {
      name: "Mom",
      icon: "fa-heart",
      bg: "bg-blue-100",
      textColor: "text-blue-500",
    },
    {
      name: "Dad",
      icon: "fa-home",
      bg: "bg-green-100",
      textColor: "text-green-500",
    },
    {
      name: "Sis",
      icon: "fa-female",
      bg: "bg-yellow-100",
      textColor: "text-yellow-500",
    },
    {
      name: "Bro",
      icon: "fa-male",
      bg: "bg-blue-100",
      textColor: "text-blue-500",
    },
];

const allContacts = [
    { name: "Alice Smith", number: "+1 234-567-8901", icon: "fa-star" },
    { name: "Bob Johnson", number: "+1 234-567-8902", icon: "fa-heart" },
    { name: "Charlie Brown", number: "+1 234-567-8903", icon: "fa-user" },
    { name: "David Lee", number: "+1 234-567-8904", icon: "fa-user-friends" },
];

const ContactsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle add form visibility

  const filteredContacts = allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'emergencyContacts'), {
        name: newName,
        phone: newPhone,
        email: newEmail
      });
      setMessage('Contact added successfully!');
      setNewName('');
      setNewPhone('');
      setNewEmail('');
      setShowAddForm(false); // Hide form after submission
    } catch (error) {
      setMessage('Failed to add contact: ' + error.message);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">My Circle</h2>
        <div className="flex flex-wrap justify-between mb-4 space-x-2">
          {favoriteContacts.map((contact, index) => (
            <div
              key={index}
              className={`w-16 h-16 ${contact.bg} ${contact.textColor} rounded-full flex flex-col items-center justify-center`}
            >
              <i className={`fas ${contact.icon} text-xl mb-1`}></i>
              <span className="text-xs font-semibold">{contact.name}</span>
            </div>
          ))}
          <div
            className="w-16 h-16 bg-gray-200 rounded-full flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setShowAddForm(!showAddForm)} // Toggle add form visibility
          >
            <i className="fas fa-plus text-xl mb-1 text-gray-600"></i>
            <span className="text-xs font-semibold text-gray-600">Add</span>
          </div>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search contacts"
            className="w-full p-2 pl-8 rounded-full border border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredContacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <div className="flex items-center">
              <i
                className={`fas ${contact.icon} text-xl text-gray-500 mr-3`}
              ></i>
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.number}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-green-500 text-white rounded-full">
                <i className="fas fa-phone"></i>
              </button>
              <button className="p-2 bg-blue-500 text-white rounded-full">
                <i className="fas fa-comment"></i>
              </button>
              <button className="p-2 bg-yellow-500 text-white rounded-full">
                <i className="fas fa-star"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Form (Visible only when the add button is clicked) */}
      {showAddForm && (
        <div className="p-4 bg-white border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Add New Emergency Contact</h3>
          <form onSubmit={handleAddContact}>
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Contact</button>
          </form>
          {message && <p className="text-green-500 mt-2">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
