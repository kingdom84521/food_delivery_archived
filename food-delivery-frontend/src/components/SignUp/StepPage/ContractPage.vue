<template>
  <v-container fluid>
    <v-row>
      <v-card class="grey col-12">
        <v-card flat class="grey lighten-3">
          <v-card-text>
            <div id="pactText" class="pa-3 white headline overflow-y-auto">
              <!-- Where cantact text display -->
              <span span style="font-size:large;">非常歡迎您光臨「食載有你」，為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</span><br><br><br>
              <span style="font-size:xx-large;">一、隱私權保護政策的適用範圍</span><br>
              <span span style="font-size:large;">隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。</span><br><br>
              <span style="font-size:xx-large;">二、個人資料的蒐集、處理及利用方式</span><br>
              <span span style="font-size:large;">當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。<br>
              本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。<br>
              於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。<br>
              為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。</span><br><br>
              <span style="font-size:xx-large;">三、資料之保護</span><br><br>
              <span span style="font-size:large;">本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。<br>
              如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。</span><br><br><br>

            </div>
          </v-card-text>
          <v-row class="mx-4" justify="end">
            <v-card-actions class="ma-1">
              <v-checkbox
                class="white ma-1 pa-4"
                hide-details
                label="同意上述條款"
                v-model="partUser.agreeContract"
              />
            </v-card-actions>
          </v-row>
        </v-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => {
      return {
        partUser: {
          agreeContract: false
        }
      }
    },
    /*watch: {
      partUser: {
        handler( value ) {
          this.$emit( "data-change", value )
        },
        deep: true
      }
    }*/
}
</script>