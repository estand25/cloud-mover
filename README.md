# Cloud-Mover

------- Features ---------
- User Authentication
-- LogIn
-- LogOut
-- Profile Page

- Notification
-- New Post
-- Update Post
-- New Reply to Post
-- Update Reply to Post
-- Like Post
-- UnLike Post
-- Delete Post
-- New Follower
-- Delete Following

- NewsFeeds
-- Populate newest Post at top

- Easy Integration with Other platforms
-- Share with Facebook
-- Share with Twitter
-- Share with SnapChat
-- Share with Reddit

-------- DB Structure --------
- User
-- Password
-- ProfileID

- Profile
-- CraateDateUtc
-- CreateBy
-- DOB
-- Email
-- Bio

- Post
-- PostId
-- Date
-- Title 
-- Text
-- Replied
-- ProfileId

- Like
-- PostId
-- Likablity 

- Following
-- FollowingID
-- ProfileId

- Follower
-- FollowerID
-- ProfileId