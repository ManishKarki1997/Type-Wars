<template>
  <div class="error-page">
    <div class="error-content-wrapper">
      <h2>404</h2>
      <p>Page not found</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  overflow: hidden;
  max-width: 95vw;

  height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;

  .error-content-wrapper {
    padding: 2rem;
    border-radius: 5px;
    background-color: white;
    text-align: center;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    &:hover {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
