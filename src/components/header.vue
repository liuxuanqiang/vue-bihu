<template>
    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" @click="toggleNavbar">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <router-link :to="{name:'index'}" class="brand">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAABcCAYAAACFvLtjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM0NjE2Mzc5QzNENDExRThCQjI4QjI5MDEwRDVGMkVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM0NjE2MzdBQzNENDExRThCQjI4QjI5MDEwRDVGMkVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzQ2MTYzNzdDM0Q0MTFFOEJCMjhCMjkwMTBENUYyRUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzQ2MTYzNzhDM0Q0MTFFOEJCMjhCMjkwMTBENUYyRUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6U9nzAAAAa3klEQVR42uxdB5wURdZ/hFMxgWLWk2AgiCQVBL4T+cwCgmHudDgFhENOMgtLUllgj6CAJEUEFNMYRteA6UBlURQRSRIVUTw/BD11VRQFhf7+r7tmt2e2Q3VP97KzU+831dWhujpMvX+/evXqvUpUnqig6EgsbyONokRac+QgLDSNStbJ2CZagfxx5PPpphN/JUWKyoA0o+1VOKpUTgDgECz7IY0Ao9csZn4iOxAQ+/X1Xdifj4051OXkP1RTVaSAIBOBoKCoA5ZTkc6ylQDMIGAGguR8I8oMoptPWayaqyIFBJkCBAVFDbCchnQ5CV43mNrM/Il1BxAoBRjai8iGUNfTPlXNVpECgvIKBAVFx2A5GqkvUhVXEJBj/lTJYZ8OMpqWT91P362aryIFBOUFCAqKqmL5D6RxSDWLAYDMIOCgD3ADAcuy2tdC7/AI9ah1QDVjRQoIDiYQFBS1w3I60rklb9TEyFZMXlopSC6jCDbn6Pkq5P2pZ533VFNWpICgrIGgoKgOllOQrk1+mzYM7QgCVoAhoUNIzp9C+aHUq+7/qSatSAFB2EBg2AOMQhqEdKg7CJi++PJKQXkQSDqXfsW+icjvodvOUPYHihQQBA4EBUVc3y1IE5BOLv0WKX2loPmY0znWIFACGhr9B1u5WH+Gbj9LU01ckQKCYEDgQqEHaGEJAERhKgVt9A523Y0kcHgH+wZSn7NXq2auSAGBfwA4FUsWtf9u/eZsvuaBKwUtrpMkhThcm1c0mo9sFPWr/41q7ooUEMgDQDUsByONRDrcFQTSUgpKlLU8V7K+kvwnHBuH9Rk0oME+1ewVKSBwBoEbiJVtRLXt35gVCISsFHQDAddzi7svW7E+mAY2fFk1fUUKCEoDQBOhB2jr/LYoTXPhQJWCHoEj6ZqLdP3B4EabFQsoUkBQUHQ8lvlIPZEqO0sBlKwUlGVoGaWgLWDYdSEswKEUWNhIKyXH92MxC1tjKOfcIsUKCgiyDwgKiv6EZR+kPKTqrlKAs/2/hTTgRQIIRCmYUs5GWrGWOr7D6p3I51JuEzXdWQFBlgBBQdFfsJyLVM/97dgwf7ojA+EpBeVBoLT+YD3We9Kwph8otlBAUHGBoKCIRf/xxMY2Ml2HzFYK2usUrEEgsb5f7yrw7MYRzYNvGdE4j8hMyNA29SnFIrMknvFaV11T+aH5eKb1FRkIqqaAAG8/iXSDHDxS+VEKWnUPHIHDQafgLmFUQT4WeV0av6oHjTwv6JmNbJY9IEPb1FKkWRLl2mbQMxYira/Ikk6q4m+2PxBIsRgs/rpaMLqVUtBVkai5jwyUAh3NAXw8goBmU17TuiGfHML/kg1zIParey2PQFBQ1I2MUQE5ALBkfgmGdjtH0+RGBjQb/UIqo9sBipvUIf88gyj/w0ig/0osshfLNRnaplZIlssUHcsfGfxfeASCgqKTyHAb5kEfIKHo8ywBaCaNjLYd+SJsPYV8npHoCeRvYt/nyA+EMDLgINFo9t0a0u6ncR/UCPi/6YX0XYa1J2aYiZJl4/p/W/4lgUEA5go/bb2SAIJprv01v45F5ZWCW7B8Djn3x96lHrWdxePZnx6Fsi2xdiny60h3fupBKZj6TNZKQUmFpZ6Pobta5AWsNOQh2yvIzoRbjvojNZMox7qhRWlch71BLQbT/OHxGVtjebaft4N0mWTZmUirfYDA+3ierUlsUGFHDQqKjiZ2CU5ULTyloIVUYJThl/048vvp1lrpiYqzPm5F7AdR0/5mKPPIZWTAw9wGV8WlvvIDVk+i0S33lqt/OBp/ActOEiX5yzctY1puNO7+8Sqha/FsLwRx2Yo8atBJHgTSsBQszWAxYucl3U/fHsiT9K23HMvlNGPLGFQ+Hte63pdS0PV5bCWcGljnr/dLpCgIRufp7O2R9oKJx4d4nVOw/CcZ0+crCclhDq75eTa97qq24pUXS0HrL6Qdg3HfvwcA4K1Qnqh//U+IRz6mbboa+YO41qnuX3TyaMps+3wKCNJjSmZE7ubx0GxDIZ43D/F6HYSe4gjT3st06Sga7woweCqbgKCFoz7AjWm8+RB4AfmtAIHwbfYHNnyV7t3YFGuP4ZpX2ioFvegP3J/vvJCYozHSMT5rOE6y3Jm41sU+r/EZmOY/aT7niXo3kXU+JTQD9X4UEgiwXuIZG2mYI289ijJbcf1V2QIEpwWiFLT6iiYzGPfpBgMEyq6TNeicb2nqhg64j/twA7fJKxEluwily50ecGM9WgdPonZl8Lb6iOSr64x7nQqmGeLzOf+M5TIk8/v7WUgGYVGuY5eYiOfZsK+N67MBCConiUV2Y+8yIwO2Q4V6ygMADCpTEEjQ4Eb7KadRb9zD5GSGlzB+cgOB0ucdE/Ddjy0jEEiXWGrJEaK2VxA4DMvXUkAgUectQiIKgy6SKNOWsoQqWysFUxj6gKSloPXIwEwAwJhy8KzsqHS+i6WgBbOb34UFICaDxWEB3/MlGdae/IDWMKRzLPbzB4p9X4Q150JmSLZm9ugIwnUs+hbSIN93d//WI3B+HVRUU9T/rd4f7VffuwnukMYa3b3udtTBSqhWciMDLqMKlucHSkdlWHuq4lEaqCLRHRmKco+h27Ex4Htl3cOpLmW+zCJlYWiORb9B6kK31vJmpz17az3U1w3ntkc618JSUKMZm9dheyHWHqWBDeWDneY22UeT1kaMyMla9TSUgu4AUbbENhg7bY6x0dVJEnVsQNpmc4wjVNUN4b7rIx0vIbWybchdAV+bp9hf5VJmUfYAQXjRhgYABHbJA8CnZ+Ckyairs8v0YfQZtaZY5xGBO+jejU9j3zAa3EhOaz2s6Q6asJqllIeklYNepjMfHJpgazAjb1A039agyJvxjheSHdE4I/ArxyLP47keJSMOhxWxheSU7NEROCkFZWcQlgaBQoDAUx5AoLfxlXYFAUrR9FdCuhHbm2jKhm4ennsBzlslryeweg82OhVFXugryXLfh3R9bjP9bI7lASw2Zw8QuCkFSUIpWJpRRkoCQCWkGTiHpz8fam/BSA5ApRc8AulhmvxRvtR12ZmIRsPTUApagAApIPD+VWY7/q0SJV8N6fr8h1nZtPDchPHZ9FdUdjWv1exGEWzPeZt61Foud3nuCmj9kpWVVkx3gCTNhUfRPetGS1161Hlv4NS1UuBm111QIBAE5bocZwvU10O5suEJ6l+mPT8i3QqA6C9AIpuAgCSmD0uEHCs5Z46kUjCqxw6Q8iFAcj4EDIDKo0lrO0oC0X2u06OtQFFmNEGR7FeZdRjsB2OPjbLuuhCZ8k6kWkg8GjVZ10XEIg9n499QNeBoQ7uRvyABAifo1n5efQpaiueW5R+kiWvq0/BmPzrjgFYgrA4P8awUdHKFpsgrGMzH1/kVrP0VqQ7SL2RMaV4a2jWj8UOF7oHnhyzBtX7P5r+gasCORd+innX2uH+IaSTK1vDEdLaORS3B6iTkQ4lHFRy/By2+p7Er3sZ5l0r7OHSbm6DILxjwCNOMMrzeXiEFKKKE89LgHIsucb3i/Vuro2wvKabz51g0kfeh8avyaeR5v7mA0lKUv9TZSMgNBMxgoMjlSxyU92IvdfRIY0KVmXguxR8VEwi8+RBwFs9Je99dGtDQELRqHqMNkQ8fAjWQ83z251zuZxbSy45KQXJ5F0oi8MrAZe29uENA9QyvwEDgRQJwm6JLH0so6K4IxKcgSQHUZa5AkHfhD1iuVfxZZpTJHporLNJXDTDaUBH1qvuDxKtsHkC0IUkfAtr5iu/KHb2fofe9D6nCKhQrWw4VegcBXv9JDlO1uklMbaWIPKDJORa18zRccm+1Fd+VO2IPTo9n2D3v17szsciBivqnVJWKQiwXbchdGpi5hYfpTArK0B2LHq34rpyRYRNwM0XjbG/CnpcO8VkTKx0vkiz7EPmPVMRDmYWp3owrIBBo5M9zbykGdp+L36/+Ppqx2T2MudU9+HMs+pvivHILCOyRaJnv86Px2h6AYGFQXowrftdAyrqQyMHe/0jJrsF3IUQbspsL8V2W/I8HVFNWlB4QEDnoBaz64LZf5RPovk/cHVNotFlK6vAUbciie2Pkm7Lkf9xVTu7jv4qlMloi0CSdd5JTgFB29lhb4ppvu0odbkpBcgOI4vt8Jwv+QzajLi+x+ZYolspoHYFMH5xkQpCzJ5ttLl0Ddmk+MqRoQ6nTh593fQMj37kcy9tTnm0hTWo73/G8wW80wjK/1L1Nv7xzGf+HM8qJnfx7uI/3Aq/VCPtWx+LI8R5q+UmxuhsQuDIYle4akJ0dPl1Mhvttexp0zkqasgFfMK2ZrYThCEjScyEKaUwrdwMnTeOJLp1KBWFxp+NQtlMpiamsmS95Gm069HUa57IupmtIz9hOCtDticf/VylWl+oaWIjnbiHIyVKEl/S6q+XZdC88gICrD4Fxrrcx4m12lX2JrzkDpfw1UFlPQ2Y3W5eLyTNBkN9u1EpiZ7CxyKfltI0/gXv7UbG6766BhMhe2rFoI5qx+Rzq38DZ42zOuS/R5I/Y+WjHEKINMcUgDciEVGuJc2onS0OSDG0JioHTs5Ts14+/bp8RG+XEIkEqQp9xCf3NzlEfMW3zKAU7S32TjCm8YSJgOhGUviDDXboi6a4BkbtSkEhmzj6LiLkSjHQryq/Gyp8Djja0Ve/zSwkmuFc7KUcGCVJBI2gw8Bs5yDuj9Xe5j5gOrgeH1pChhGzn4zx2aqJGMjx1Daz62d5BgH+9aNomd4u+oY2/RWGOSfhtgNGGdmD/VTS2tbsoOHzpsSjb1bq7IYcDlkOrmUXcHWgDZvm63N6hIW1cg3S3kEzWOaQVArDY/fn5OHe7YnHproGTUpAshu3IjTlZy8tBK9wj1OQ23UQT17TB2is470wpvYCV9GBsb9C7GuNay/35huOSarZdHhkdAVEmuClbkbK9V4jMr4FRMmO4Lxb5WYn4oXcN3L6+ZOMsxKL/XlLHCJqyYQHlNNrp/mVu9glNWN0c50/BiT2RV/IYbWg/1u/TvRKPay03xXVYIQfdHOgawMQLGGjllokmqGauSKJrQM5KQTcQsHYsehQW06TvYkTz3TSyeS+c2xznPYHz99pYCpoZkF2iPYr1xugKDJAGAYMe0OdGuBlSeQUB5bxUUYZSJZqzTbMFAXd9gA1TFDNXdxrSeIHnu8pfye7M2qGaC1HRGchrYpsr5HkKPEy1HPkSAMDPnuvOLeyN5WwXP4TssWi+rbty4zkbYTGuVFdp9tWVVLOquKRVULA3gMCfUtBGUZb0hd2DzdaU22RduXja3MKWuKl3cE9/8uSH0M4tWSoIcP5AewUECggysGtgGazEV7Qhq/MOx+J1mrS2bjkAgQa4l5d1EPAc1swGBMxOVFS3QFFGAwFp++VGBqSjDaX27dm1+Bs0cc2ZBxEEGuJGFuNejpM3aSaHYC5k5/G5SDUpRZkJBBp9H0K0oVTmqYO0nMavbnEQQKAtrr0M6VRXYyVNMoCJrUSRNf4PFFUwYhPjj8jW3j5Qx6LHYbGM/vUhWx1Op1HnayEDAPtayMX183HdKtbPYCPukw3D24FASb3rA32GaJyndj+GtJFikXGhvatoPMpLpDm4zsIA6rue2FCJ6EnUtzKNetj1eU/9HcQiiwJ8XlYGH4k6L8Y6O9RxklZ3ieArFRwI2KtsYrKQb6UgkaTLM27Y9+qxDcat7EN3XrAhJBBojGvNxTVb+FIKuoGAvTI1aA+9tcmwkltoasT1sHzaoiy/2wXE0Xu82/43QOIYECcmXcs/sYn3/yK9S8akJL/0P0h/R3rD9Pw86tPboizHG2AHo+9K1ltdrLOnayfDKjZkujsbJAL2+z8qpGhDdl2Ii7BYQ2NX8Ay6CXRXy2Bmrg0rrIe670DdXXTDJJngJLZdgVTR36HLUAIkzwX8/yS+VObp1OwFqkZKuVMFqHfWgdYuCEc0fiyWp1scScR1qIky/CX/JeX4Dkeb/Wg81XFtwsT8YRyz8+swAnXOdnn+M0RunmB1WMrzMwCeItZbCfDxQ+w5yyx1XEg8Kc2Ij5gFXYO+9dbQzC1r0JCbhRBtyMlcuKqYeNSV8t5fhJxF4BdpTKs9np5g+FK2OeBINt30GIZeIhT50QdYvg99XyHNu2ZbgOIrG2RdKbauxfYFZJgHTwED1TaV4y/vYqQfdPE+FnGKxHONzpz2xA5ArByKDkJyMhAzA8HJxMPSRoThXxzO2evw7Cdh+RRSI7FnJvb9JurshWecZio7iwyT9n/r78b5nb6KZcNioIrGtxN7zDLoA9Q70FR2gQCC/2YHEBgNeSwWz4cUbcht+jD679pVyDn9Tne99wGOoTFqm5FvxTFG5J9F2WrIWXyti7wRjrdBfoH+VZCyg9Dspw/LKgVTpYWSfEzA/01TpHqmL2Pi6/ikqbE2FN2Evbo0EIt84VInS16J6cQ3keFK/IkUCYKjBN8o1hPHnKc8J4ApGq8jvqzMtI2xf6fPZ+evvjm2YUvTelfT8/9TgMAG/Z7du0RHCWkiYetRQzxvor4mZMzN+E10HTiewZpsAIIS45fpm15Bg75aHgSkow3JdSHc6ne8L5dznAyBPCsFLUHgWZrXKRKCEm+zEPuPQZpIRhDOdmjwheL4w7okxH1ydzE7te7HRP+bpQgzuHQhIwDJMuz/i4f6qgjJxG268FJdSede3zmCwRegfHfx9T4C68endEmYYU/wNN04cV4sUkkER12iA2Qs0g3bo0R3Y78uLaSEZq+oBkVVS56QOELxajzpCe4Ti/zGQZAV070wtGzEYovr+1cKmuv6kmT9H3hj1JpY1tf7rbHIfmw3E0damyL7Jva1xb4TxfoLKC8Ty5FDgjPTj8e5z+Oc3wQzjxLHp3m840kmENhMxpRhMx0ipBBZaiPy94Ruo5bePqPxvBTJgXSpIBpPSCd5Ht5xfVGvvoXtzqUUhdH406izR3Z0DZgGNtxB927sgIa9FA28Whk4FpXUJzho+ckv0JAzQEjNtaBEmLf2NL9TGP3IdsV9V2OIq40Q7dnHYpOUsn8zrW8nmaCuscg61BsTYDBFiNg5YgSBffwVeJAEplKyc5OfqLTfx8M8Pn/C7R2PxFwq1rcgjbYoa96X53CvzYUSsJoJsMyjJCxdMLB/pksZxrvICqqarBLSHYuib6axUuW4EB2LOoMLefoip6cUTAIoKaVgoswOAQLrQ/pvEmbZfclwV8aM9BoZvgoTwWQ4TPcVSHealHxbPFxjkDj/djAJ2130ECLxbR6GIBmU/kGGW/UJogvTMqVf74cSCtF5JqUj6zfmmsq8rHcX5L0XvU7J3o8LxfvqSOwTg31AGiDG9U0XQLAo+4CAKacRwGA9Ryzm2XeXSUkATvoBN30AyU54kvlaB6QUdKxD334R673poc5hGprcI3Q446lk3JwdcX5o+sJ1E2sbivUGXoj71dH4jaKx9y4Gh1hklYc6Vos6WKF4mtj7APHwYDJVJznv0Am6UowcXC62WRH6RlIg0mj8D3EPss/+iHinfXRgjUXaiW7WUAFkj+ujEkQjkW4RoPBKNgBBZcu9Oed+icZ+BRr7zUhfpRltyFkpKDMCYamj8AkCGsmaC5OFG7MvsPpXSAGdQwYBw0VXLML97ruTugDReHCzG6Nx7rdfTMluVS426Rtk7/WlFC/GDCpFKWm7xzr5HFZeJ2woThD3ms47HSr8QNoNXbJrePZrkS+Aa5bwjpSlQMA0tLFGuU0eRxM5W39BHFDUX7Qhh7BpmkOZ1LrIJs6hy/VlRgY0uxmYxeX3YN9dyBsABOJl9u8YCkJWRPJX8GchyvcPoN6jxNAbM+8dojswS3wBOVbDNhyfgFTL5xXWCtHanB7wUQ9b9dUT91VN7wpE42eGCL7syPVV056VlCVU1f2vaPqL3lgmrJ6vf5007QbpkYG0lIJuugev3QcfSkGjfAz7cgEAO8oQACoJ0XSW0AfkmBR4r+M4D+vxqEIdj/Vy35cB4CqTnmGZrocwlIdslThTfImHC635Ml0Z6C2a8NJi4xzDOKiNuF5vyfusLiShXgIE+Hm7I7Gyb5fQ7lf2rICMxq81nbcv5ejxQnl6vQBGVoI+h32soxiF5/k2OyWCVBrR/HOkCBgDjUlbZzkVV5MEARl/ACRxjqXYb8fcFl9/5y7ISqTWNO+aLmUKAolugdH4q4k++1Qxnt0Q+cdCo87Rfzgs+O9C+y1DX5FhXXi4UJxdrdsKMAgY1/0Mqb249nOibg5j92EaT8OMzDYLC8T2RolzuMvCFpM79WeNRXhi3BCdSQ1RPV/c36HkLYoR23o8K85LderKdgs3CSmpqdAT7BcKwwofMs1ffzP/wyqGo1Ge2SdGF7wqBX191ctEKbhTj81I2iM0r9PBsx6Jxg8TjL/a4hjPF7hO9L3Z6OVzD/VepGvKY5FvJMoerSsAZYOpROOsLLyB2BrPbIhjzG48loy4mItdzKAT5zADfoOy31kcu0QA1DZd8x+L7Ja8P5YoGpNhEs32GXuExHKlAAC2PFyi21QY5blbshvbX5U0Z00BQSka+0ENvJrRYKC++twBJ6WgLEMTebcuDMZcGKKiNhX5eEgBu0mRIgtSQOBEee8zck7DW7rS+qvuh6HL1FIQ/V8th+Ze85lq6ooUEKRLo5dfhTc1zRhpCFApSOTPsah7N4ODogyguR3fUk1cUTYDQeVAaxvT6jXh5jsH+Y8SIcrklIJ+HYvauVczZjTerk+9ViCgSBGF53p71DI2ABknohdV9mQuHJ5ScD8W9yMfDQBQjkYVKYkgdCBI0Mh3muLtsUHJRQdZKbgIi0H0YMdNqjkrUkBQ1kCQoOFL2QbhHrzKWr6nHPtzLMrOTXIAAAtVM1akgOBgAwHTsEKOPpyD1zlCBD8JJ9qQsc1GIPm6NPJgx32qCStSQFBegCBBQ5dwjAGeUNMlBMeiHMLtISxH0YMdvlZNV5ECgvIKBAnKeZO9zk4XfgeDcCzKgUwG0JwOq1WTVaSAQJ4qH9SrT7mEoxqzA4vuyHemEW3oS2zfiHSRAgFFijJNIjDTwMVHgqP7gqmHgKFrmiDYSSm4C/kkbM8BAPyq/k5FSiLIdCBIUP9/88ww9krTEW+9GRj9LLz+6gIEirBvK9ZXIX8J22/SA+1/V81TkQKC9Oj/BRgA2sWx7vQCb5oAAAAASUVORK5CYII=">
                    </router-link>
                </div>
                <div id="navbar" :class="['navbar-collapse', 'collapse', collapseIsShow ? 'in' : '']">
                    <ul class="nav navbar-nav">
                        <li><router-link :to="{name:'index'}">推荐</router-link></li>
                        <li @mouseover="showCategoryMenu" @mouseout="hideCategoryMenu">
                          <a href="javascript:;" :class="$route.query.code ? 'active' : ''">更多</a>
                          <category-menu :hide="hide" :data="categoryList"></category-menu>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="">登录</a></li>
                        <li><a href="">注册</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CategoryMenu from "../components/category";
export default {
  components: {
    CategoryMenu
  },
  data() {
    return {
      hide: false,
      collapseIsShow: false,
      categoryList: []
    };
  },
  created() {
    this.queryBoardList();
  },
  methods: {
    queryBoardList() {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/queryBoardList")
        .then(res => {
          if (res.data.resMsg === "success") {
            this.categoryList = res.data.data.noSubList;
          }
        });
    },
    showCategoryMenu() {
      this.hide = true;
    },
    hideCategoryMenu() {
      this.hide = false;
    },
    toggleNavbar() {
      this.collapseIsShow = !this.collapseIsShow;
    }
  }
};
</script>
<style lang="less">
.navbar {
  width: 100%;
  background: #444;
  .navbar-toggle {
    margin-right: -15px;
    .icon-bar {
      background: #fff;
    }
  }
  .navbar-inner {
    background: 0 0;
    border-radius: 0;
    border: none;
    box-shadow: none;
    width: 90%;
    margin: auto;
    padding: 5px;
    .brand {
      display: inline-block;
      width: 110px;
      padding: 5px 0;
      img {
        width: 100%;
      }
    }
    .nav {
      padding-left: 35px;
      li {
        position: relative;
        a {
          color: #ccc;
          font-size: 16px;
          &:hover {
            background: #444;
            color: #fff;
          }
          &.active {
            color: #fff;
          }
        }
        .avatar {
          width: 30px;
          height: 30px;
          margin-top: 5px;
          padding: 0;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .navbar-collapse {
    position: fixed;
    top: 60px;
    right: 0;
    width: calc(35% + 15px);
    height: calc(100vh - 60px);
    max-height: 100vh !important;
    background: #444;
  }
}
</style>
