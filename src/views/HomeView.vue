<template>
  <div class="main-container">
    <div class="header">
      <h2>Medium<sup>mini</sup></h2>
      <el-button round size="large">Get Started</el-button>
    </div>
    <el-divider />
    <div class="content">
      <div class="left-content">
        <h3>
          Human <br />
          stories & ideas
        </h3>
        <h4>A place to read, write, and deepen your understanding</h4>
        <el-button round size="extralarge" style="font-size: 20px; padding: 1.5rem"
          >Start Reading</el-button
        >
      </div>
      <div class="right-content">
        <img src="../assets/homepage-image.png" alt="" />
      </div>
    </div>
    <el-divider />
    <div class="footer">
      <ul>
        <li>About</li>
        <li>Help</li>
        <li>Terms</li>
        <li>Privacy</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  background-color: rgb(253, 249, 243);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  max-width: 1281px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.3rem;
  padding-inline: 1rem;
}

.header sup {
  font-size: 0.8rem;
  font-weight: normal;
}

:deep(.el-button) {
  background-color: green;
  color: #ffffff;
}

:deep(.el-divider) {
  margin: 0;
}

.content {
  width: 100%;
  max-width: 1281px;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
}

.left-content {
  width: 100%;
  height: 100%;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: start;
  justify-content: center;
  gap: 1.5rem;
}

.left-content h3 {
  font-size: 80px;
  font-weight: normal;
}

.right-content {
  display: none;
}

.footer {
  width: 100%;
  max-width: 1281px;
}

.footer ul {
  width: 80%;
  max-width: 430px;
  padding-block: 1.3rem;
  padding-inline: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style: none;
}

.footer ul li {
  font-size: 0.8rem;
}

@media (min-width: 1025px) {
  .left-content {
    width: 50%;
  }

  .right-content {
    display: block;
    width: 50%;
  }

  .right-content img {
    width: 100%;
    height: 100%;
  }

  :deep(.el-button) {
    background-color: black;
  }
}
</style>
