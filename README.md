# react test


## Sku
Sku(Stock Keeping Unit)最小货存单位

## Sku组合实现思路

### 笛卡尔积

> 笛卡尔乘积是指在数学中，两个[集合] *X* 和 *Y* 的笛卡尔积(Cartesian product)，又称 [ 直积 ] ，表示为 *X* × *Y*，第一个对象是 *X* 的成员而第二个对象是 *Y* 的所有可能 [ 有序对 ] 的其中一个成员。假设集合A={a, b}，集合B={0, 1, 2}，则两个集合的笛卡尔积为{(a, 0), (a, 1), (a, 2), (b, 0), (b, 1), (b, 2)}。
>

---

例如，我们有一个笔记本，它有颜色，尺寸，存储三个属性

```tsx
color = [ '银色','白色']

size = ['13.3寸','15寸']

storage = ['128g','256g']
```

那么就会出现以下的组合：

![cartesian.png](https://s2.loli.net/2022/01/11/NUvCBaoIMLbYq12.png)



### 什么是图

图其实是数学的一个分支。它以图为研究对象。图论中的图是由若干给定的点及连接两点的线所构成的图形，这种图形通常用来描述某些事物之间的某种特定关系，用点代表事物，用连接两点的线表示相应两个事物间具有这种关系：

![图.jpg](https://i.loli.net/2020/06/21/aK6qZJw2Odm1Q9u.jpg)

图通常有如下分类:

- 分为有向图和无向图
- 分为有权图和无权图

根据很多博客中提到，sku可以使用无向图来表示，如果两个点之间有联通，就代表这条路径可行。

假如上面的笔记本，以下的sku是有库存的：

黑 13.3寸 128g

黑 13.3寸 256g

白 15寸 256g

那么转化为无向图就是：

![image.png](https://s2.loli.net/2022/01/12/CIhbEpDZyu1JmtA.png)

转为邻接矩阵

![image.png](https://s2.loli.net/2022/01/12/HoN6hSy9xTzBdCa.png)

当选择黑色后：

![image.png](https://s2.loli.net/2022/01/12/hYTHsyEGMP5j3fc.png)

15寸为0，所以代表黑色和15寸不连通，所以按钮置灰

再选择13.3寸：

![image.png](https://s2.loli.net/2022/01/12/chOY6aGepLAQ3NJ.png)

除了选择的黑色和13.3，白色和15为0，应置灰。所以看上去无向图确实可以来解决sku，但是，会存在问题，如下面的情况：

存在以下的库存：

黑 13.3寸 128g

黑 13.3寸 256g

黑 15寸 128g

白 13.3寸 128g

白 13.3寸 256g

白 15寸 128g

白 15寸 256g

转为图：

![image.png](https://s2.loli.net/2022/01/12/xDZawRhiAKkBcyL.png)

![image.png](https://s2.loli.net/2022/01/12/kYlvyQX3EMPiesr.png)

![image.png](https://s2.loli.net/2022/01/12/H9A3I5jdvgXrfJh.png)

由于闭环形成了新的规格，[’黑’,’15寸’,’256g’]这个应该不存在。



解决方法：**使用加权图**。

在初始化邻接矩阵时，将当前sku的路径统一一个wight值，并且为相关属性添加上这个值

![image.png](https://s2.loli.net/2022/01/12/rdpqsLTJF4h3GP1.png)

此时选择黑色，15可以看出256那一行并没有交集，而白色和13.3，因为选择的是他们的同级，所以只要看除了1，剩余的数组否有交集。

![image.png](https://s2.loli.net/2022/01/12/IreA3c6Ff4mbRk7.png)







