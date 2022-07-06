// const express = require("express");
const User = require("../../components/../models/User");

async function getUserFollowers(id) {
  try {
    let suggestions = [];
    const data = await User.findById(id, { following: 1 });
    data.following.forEach((follower) => {
      if (suggestions.length > 10) return suggestions;
      suggestions.push(follower);
    });
    return suggestions;
  } catch (error) {
    console.log(error);
  }
}

// async function getSuggestions( followerId){
//     try {
//         let suggestions = []
//         const data = await User.findById(id)
//         const = {}
//     } catch (error) {

//     }
// }

module.exports = { getUserFollowers };
