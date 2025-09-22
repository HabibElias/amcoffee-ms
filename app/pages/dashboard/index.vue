<template>
  <div>
    You are logged in

    {{ (() => {
      return new Date(Date.now()).toLocaleDateString()
    })() }}
  </div>
</template>
