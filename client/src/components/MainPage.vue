<template>
    <div>
      <br>
      <div class="btn-group btn-group-lg d-grid gap-1 mx-auto align-bottom" role="group">
        <h1 class="cover-heading">Image generation service</h1>
        <br>
        <p class="lead">
          The Web-app system where you can generate images from CGAN models.<br>
          Admin can register new users or delete created accounts in special admin menu.<br>
          In order to generate images click button below which will redirect to predict page.
        </p>
        <br>
        <a href="predict/" type="button" class="btn btn-secondary">Predict Page</a>
      </div> 
    </div>
</template>
<script>
export default {
  name: 'MainPage',
}
</script>
