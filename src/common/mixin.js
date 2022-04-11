import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            showBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
        }
    }
}