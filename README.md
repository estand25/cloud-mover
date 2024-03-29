[![Coverage Status](https://coveralls.io/repos/github/estand25/cloud-mover/badge.svg?branch=master)](https://coveralls.io/github/estand25/cloud-mover?branch=master)

# Cloud-Mover

------- Features ---------
- User Authentication
  - LogIn
  - LogOut
  - Profile
  - Sign up
  - Front Page

- Notification
  - New Post
  - Update Post
  - New Reply to Post
  - Update Reply to Post
  - Like Post
  - UnLike Post
  - Delete Post
  - New Follower
  - Delete Following

- NewsFeeds
  - Populate newest Post at top

- Easy Integration with Other platforms
  - Share with Facebook
  - Share with Twitter
  - Share with SnapChat
  - Share with Reddit

-------- DB Structure --------
- User
  - Password
  - AuthProvider
  - ImageExt
  - name
  - uid

- Profile
  - CreateDateUtc
  - CreateBy
  - ModifiedDateUtc
  - ModifiedBy
  - DOB
  - Email
  - Bio
  - DisplayName

- Post
  - PostId
  - CreateDateUtc
  - CreateBy
  - ModifiedDateUtc
  - ModifiedBy
  - Title 
  - Text
  - Replied

- Like
  - PostId
  - Likablity 

- Following
  - FollowingID

- Follower
  - FollowerID